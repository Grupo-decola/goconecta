namespace app_goconecta.Server.DTOs.Hotel;

public class HotelCreateDTO
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int Rating { get; set; }
    
    public string Region { get; set; }
    public string Address { get; set; }

    public static HotelDTO FromModel(Models.Hotel hotel)
    {
        return new HotelDTO
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Description = hotel.Description,
            Rating = hotel.Rating,
            Region = hotel.Region,
            Address = hotel.Address
        };
    }
}