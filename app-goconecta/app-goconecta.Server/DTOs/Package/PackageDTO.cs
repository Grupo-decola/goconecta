using app_goconecta.Server.DTOs.Hotel;

namespace app_goconecta.Server.DTOs.Package;

public class PackageDTO
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Destination { get; set; }
    public int DurationDays { get; set; }
    public decimal PriceAdults { get; set; }
    public decimal PriceChildrens { get; set; }
    public DateTime AvailabilityStartDate { get; set; }
    public DateTime AvailabilityEndDate { get; set; }
    public HotelDTO? Hotel { get; set; }
    public MediaDTO? Image { get; set; } 
    public required double AverageRating { get; set; }
    
    public static PackageDTO FromModel(Models.Package package)
    {
        return new PackageDTO
        {
            Id = package.Id,
            Title = package.Title,
            Description = package.Description,
            Destination = package.Destination,
            DurationDays = package.DurationDays,
            PriceAdults = package.PriceAdults,
            PriceChildrens = package.PriceChildren,
            AvailabilityStartDate = package.AvailabilityStartDate,
            AvailabilityEndDate = package.AvailabilityEndDate,
            Hotel = HotelDTO.FromModel(package.Hotel!),
            Image = package.Media.Where(p=> p.Type=="Image") .Select(MediaDTO.FromModel).FirstOrDefault(),
            AverageRating = package.AverageRating
        };
    }
}