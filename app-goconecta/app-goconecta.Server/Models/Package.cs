namespace app_goconecta.Server.Models;

public class Package
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Destination { get; set; }
    public int DurationDays { get; set; }
    public DateTime AvailabilityStartDate { get; set; }
    public DateTime AvailabilityEndDate { get; set; }
    public decimal Price { get; set; }
    
    public ICollection<Media> Media { get; set; } = new List<Media>();
    
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    // public ICollection<Rating> Rating { get; set; }
    // public ICollection<CustomizationRequest> CustomizationRequests { get; set; }
}