using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.Models;

public class Package
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    [Required]
    public string Destination { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    
    // Temporariamente não será usado
    public DateTime AvailabilityStartDate { get; set; } = default;
    public DateTime AvailabilityEndDate { get; set; } = default;

    public decimal PriceAdults { get; set; }
    public decimal PriceChildren { get; set; }
    
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
    
    public ICollection<Media> Media { get; set; } = new List<Media>();
    
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}