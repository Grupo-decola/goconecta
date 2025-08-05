using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe.Checkout;

namespace app_goconecta.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController(AppDbContext context, IConfiguration configuration, SessionService sessionService, EmailService emailService) : ControllerBase
{
    private readonly string _spaProxyUrl = configuration["SpaProxyServerUrl"] ?? "";

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout(CheckoutDTO checkoutDto)
    {
        var reservation = await context.Reservations
            .AsNoTracking()
            .Include(reservation => reservation.Package)
            .FirstOrDefaultAsync(r => r.Id == checkoutDto.ReservationId);
        
        if (reservation == null) return NotFound("Reserva não encontrada.");
        if (reservation.Status != ReservationStatus.Pending) return BadRequest("Reserva não está pendente para pagamento.");
        
        var routePrefix = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/{ControllerContext.ActionDescriptor.RouteValues["controller"]}";
        var successUrl = $"{routePrefix}/success?sessionId={{CHECKOUT_SESSION_ID}}{(checkoutDto.SuccessUrl != null ? $"&redirectUrl={Uri.EscapeDataString(checkoutDto.SuccessUrl)}" : string.Empty)}";
        var cancelUrl = $"{routePrefix}/cancel?sessionId={{CHECKOUT_SESSION_ID}}{(checkoutDto.CancelUrl != null ? $"&redirectUrl={Uri.EscapeDataString(checkoutDto.CancelUrl)}" : string.Empty)}";
        
        var options = new SessionCreateOptions
        {
            LineItems =
            [
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "brl",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = reservation.Package!.Title,
                        },
                        UnitAmount = (long) reservation.GetTotalPrice() * 100 // Centavos
                    },
                    Quantity = 1,
                }
            ],
            Mode = "payment",
            SuccessUrl = successUrl,
            CancelUrl = cancelUrl,
            ClientReferenceId = reservation.Id.ToString(),
        };
        var session = await sessionService.CreateAsync(options);
        return Ok(session.Url);
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("success")]
    [AllowAnonymous]
    public async Task<IActionResult> Success([FromQuery] string sessionId, [FromQuery] string? redirectUrl)
    {
        if (string.IsNullOrEmpty(sessionId)) return BadRequest("ID da sessão não fornecido.");

        Session session;
        try { session = await sessionService.GetAsync(sessionId); }
        catch { return Unauthorized("ID da sessão inválido."); }

        if (session.PaymentStatus != "paid") return Unauthorized("Pagamento não realizado.");

        if (!int.TryParse(session.ClientReferenceId, out var reservationId))
            return BadRequest("ID de reserva inválido.");

        var reservation = await context.Reservations.FirstOrDefaultAsync(r => r.Id == reservationId);
        if (reservation == null) return NotFound("Reserva não encontrada.");
        
        reservation.Status = ReservationStatus.Confirmed;
        context.Reservations.Update(reservation);
        await context.SaveChangesAsync();
        
        await context.Entry(reservation).Reference(r => r.Package).LoadAsync();
        await context.Entry(reservation).Reference(r => r.User).LoadAsync();

        await emailService.SendEmailAsync(
            reservation.User!,
            "Sua reserva foi confirmada!",
            $"""
            Olá, {reservation.User!.Name}.
            Sua reserva para o pacote {reservation.Package!.Title} foi confirmada com sucesso!
            Confira os detalhes:
            <ul>
                <li> Número da reserva: {reservation.ReservationNumber} </li>
                <li> Data da reserva: {reservation.ReservationDate:dd/MM/yyyy} </li>
                <li> Total pago: R$ {reservation.GetTotalPrice:F2} </li>
            </ul>
            Agradecemos por escolher a GoConecta para sua viagem. Estamos ansiosos para proporcionar uma experiência incrível!
            """);
        
        return !string.IsNullOrWhiteSpace(redirectUrl) && IsValidRedirectUrl(redirectUrl) ? Redirect(redirectUrl) : Redirect("/");
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("cancel")]
    [AllowAnonymous]
    public async Task<IActionResult> Cancel([FromQuery] string? sessionId, [FromQuery] string? redirectUrl)
    {
        if (string.IsNullOrEmpty(sessionId)) return BadRequest("ID da sessão não fornecido.");
        
        Session? session;
        try { session = await sessionService.GetAsync(sessionId); }
        catch { return BadRequest("ID da sessão inválido."); }

        if (!int.TryParse(session.ClientReferenceId, out var reservationId))
            return BadRequest("ID de reserva inválido.");
        
        var reservation = await context.Reservations.FirstOrDefaultAsync(r => r.Id == reservationId);
        if (reservation == null) return NotFound("Reserva não encontrada.");
        
        reservation.Status = ReservationStatus.Cancelled;
        context.Reservations.Update(reservation);
        await context.SaveChangesAsync();

        if (!string.IsNullOrEmpty(redirectUrl) && IsValidRedirectUrl(redirectUrl))
            return Redirect(redirectUrl);
        return Redirect("/");
    }

    private bool IsValidRedirectUrl(string url)
    {
        return url.StartsWith(_spaProxyUrl, StringComparison.OrdinalIgnoreCase);
    }
    
}