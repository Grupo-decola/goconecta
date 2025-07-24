namespace app_goconecta.Server.Models;

public class Reservation
{
    public int Id { get; set; }
    public required string ReservationNumber { get; set; }
    
    public DateTime ReservationDate { get; set; }
    
    public required string Status { get; set; } // Pending, Confirmed, Canceled
    // public decimal TotalValue { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
    
    public int PackageId { get; set; }
    public Package? Package { get; set; }
    
    // public ICollection<Payment> Payments { get; set; }
}
