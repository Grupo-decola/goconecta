namespace app_goconecta.Server.DTOs.Hotel;

public class HotelDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Region { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    
    public List<AmenityDTO> Amenities { get; set; }
    public ICollection<MediaDTO> Images { get; set; } = new List<MediaDTO>();
    
    public static HotelDetailDto FromModel(Models.Hotel hotel)
    {
        return new HotelDetailDto()
        {
            Id = hotel.Id,
            Name = hotel.Name!,
            Description = hotel.Description!,
            Rating = hotel.Rating,
            Region = hotel.Region!,
            Address = hotel.Address!,
            Amenities = hotel.Amenities?.Select(AmenityDTO.FromModel).ToList() ?? new List<AmenityDTO>(),
            Images = hotel.Media.Where(p=> p.Type=="Image") .Select(MediaDTO.FromModel).ToList()
        };
    }
}