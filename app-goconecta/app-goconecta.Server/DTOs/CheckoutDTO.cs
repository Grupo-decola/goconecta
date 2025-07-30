namespace app_goconecta.Server.DTOs;

public class CheckoutDTO
{
    public int ReservationId { get; set; }
    public string? SuccessUrl { get; set; }
    public string? CancelUrl { get; set; }
}