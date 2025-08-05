namespace app_goconecta.Server.DTOs.Hotel;

public class HotelCreateDTO
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Region { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}