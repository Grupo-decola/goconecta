using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController(AppDbContext context, IConfiguration configuration, EmailService emailService) : ControllerBase
{
    private readonly string _spaProxyUrl = configuration["SpaProxyServerUrl"] ?? string.Empty;
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IReadOnlyList<ReservationDTO>>> GetAll()
    {
        return (await context.Reservations.
            Include(r => r.Package)
            .ThenInclude(p => p.Hotel)
            . ToListAsync()).Select(ReservationDTO.FromModel).ToList();
    }

    [HttpGet("{id:int}", Name = "GetReservationById")]
    [AllowAnonymous]
    public async Task<ActionResult<ReservationDTO>> GetById(int id)
    {
        var reservation = await context.Reservations
            .Include(r => r.Guests)
            .Include(r => r.Package)
            .ThenInclude(p => p.Hotel)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (reservation == null)
        {
            return NotFound();
        }
        return Ok(ReservationDTO.FromModel(reservation));
    }
    
    [HttpPost]
    public async Task<ActionResult<ReservationDTO>> Create(ReservationCreateDTO createDto)
    {
        var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "UserId")!.Value);
        
        if ((await context.Packages.FirstOrDefaultAsync(p => p.Id == createDto.PackageId)) == null)
        {
            return BadRequest("Package not found.");
        }
        
        if (createDto.ReservationDate <= DateTime.UtcNow)
        {
            return BadRequest("Reservation date cannot be in the past.");
        }
        
        var reservation = new Reservation
        {
            UserId = userId,
            PackageId = createDto.PackageId,
            ReservationNumber = $"RES{createDto.PackageId}-{Guid.NewGuid()}",
            ReservationDate = createDto.ReservationDate,
            Status = "Pending",
            Guests = createDto.Guests
        };

        context.Reservations.Add(reservation);
        await context.SaveChangesAsync();
        
        await context.Entry(reservation).Reference(r => r.Package).LoadAsync();
        await context.Entry(reservation).Reference(r => r.User).LoadAsync();
        await context.Entry(reservation.Package).Reference(p => p.Hotel).LoadAsync();
        
        await emailService.SendEmailAsync(
            reservation.User!,
            "Sua viagem já está reservada!",
            $"""
             Olá, {reservation.User!.Name}.
             Sua reserva para o pacote {reservation.Package!.Title} foi criada com sucesso!
             Confira os detalhes:
             <ul>
                 <li> Número da reserva: {reservation.ReservationNumber} </li>
                 <li> Data da reserva: {reservation.ReservationDate:dd/MM/yyyy} </li>
                 <li> Hotel: {reservation.Package.Hotel!.Name} </li>
                 <li> Total: {reservation.TotalPrice:C} </li>
             </ul>
             Agora, basta acessar a página <a href="{_spaProxyUrl}/minhasreservas">Minhas Reservas</a> para completar o pagamento.
             Agradecemos por viajar conosco!
             """
        );
        
        return CreatedAtRoute("GetReservationById", new { id = reservation.Id }, ReservationDTO.FromModel(reservation));
    }
}