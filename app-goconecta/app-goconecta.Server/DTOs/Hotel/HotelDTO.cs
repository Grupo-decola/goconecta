namespace app_goconecta.Server.DTOs.Hotel;

public class HotelDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int Rating { get; set; }
    public MediaDTO? Image { get; set; }

    public static HotelDTO FromModel(Models.Hotel hotel)
    {
        return new HotelDTO
        {
            Id = hotel.Id,
            Name = hotel.Name!,
            Rating = hotel.Rating,
            Region = hotel.Region!,
            Image = hotel.Media.Where(p=> p.Type=="Image") .Select(MediaDTO.FromModel).FirstOrDefault()
        };
    }
}