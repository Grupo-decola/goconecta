using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class PackageDetailDTO
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Destination { get; set; }
    public int DurationDays { get; set; }
    public decimal PriceAdults { get; set; }
    public decimal PriceChildren { get; set; }
    public HotelDTO Hotel { get; set; }
    public ICollection<MediaDTO> Images { get; set; } = new List<MediaDTO>();
    public ICollection<MediaDTO> Videos { get; set; } = new List<MediaDTO>();
    
    public static PackageDetailDTO FromModel(Package package)
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
            Hotel = HotelDTO.FromModel(package.Hotel!),
            Images = package.Media.Where(p=> p.Type=="Image")
                                  .Select(MediaDTO.FromModel).ToList(),
            Videos = package.Media.Where(p=> p.Type=="Video")
                                  .Select(MediaDTO.FromModel).ToList(),
        };
    }
    
}

