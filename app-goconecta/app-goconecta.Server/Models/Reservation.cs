using app_goconecta.Server.DTOs;

namespace app_goconecta.Server.Models;

public class Reservation
{
    public int Id { get; set; }
    public required string ReservationNumber { get; set; }
    
    public DateTime ReservationDate { get; set; }
    
    public required string Status { get; set; } // Pending, Confirmed, Canceled
    
    public IEnumerable<Guest> Guests { get; set; } = new List<Guest>();
    
    public int UserId { get; set; }
    public User? User { get; set; }
    
    public int PackageId { get; set; }
    public Package? Package { get; set; }

    public int NumberOfAdults => Guests.Count(g => g.IsAdult);
    public int NumberOfChildren => Guests.Count(g => !g.IsAdult);
    public decimal TotalPrice => (NumberOfAdults * Package!.PriceAdults) + (NumberOfChildren * Package.PriceChildren);
}
