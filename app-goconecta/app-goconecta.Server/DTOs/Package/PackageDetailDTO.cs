namespace app_goconecta.Server.DTOs.Package;

public class PackageDetailDTO
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Destination { get; set; }
    public int DurationDays { get; set; }
    public decimal PriceAdults { get; set; }
    public decimal PriceChildren { get; set; }
    public DateTime AvailabilityStartDate { get; set; }
    public DateTime AvailabilityEndDate { get; set; }
    public HotelDTO Hotel { get; set; }
    public ICollection<MediaDTO> Images { get; set; } = new List<MediaDTO>();
    public ICollection<AmenityDTO> Amenities { get; set; } = new List<AmenityDTO>();
    
    public required PackageRatingDataDto RatingData { get; set; }
    
    public static PackageDetailDTO FromModel(Models.Package package)
    {
        return new PackageDetailDTO
        {
            Id = package.Id,
            Title = package.Title,
            Description = package.Description,
            Destination = package.Destination,
            DurationDays = package.DurationDays,
            PriceAdults = package.PriceAdults,
            PriceChildren = package.PriceChildren,
            AvailabilityStartDate = package.AvailabilityStartDate,
            AvailabilityEndDate = package.AvailabilityEndDate,
            Hotel = HotelDTO.FromModel(package.Hotel!),
            Images = package.Media.Where(p=> p.Type=="Image") .Select(MediaDTO.FromModel).ToList(),
            Amenities = package.Hotel!.Amenities.Select(AmenityDTO.FromModel).ToList(),
            RatingData = PackageRatingDataDto.FromPackage(package)
        };
    }
    
}

