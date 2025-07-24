namespace app_goconecta.Server.Models;

public class Hotel
{
    public int Id { get; set; }
    
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Rating { get; set; }
    public int RoomsAvailable { get; set; }
    
    public string? Region { get; set; }
    public string? Address { get; set; }

    public ICollection<Package> Pacotes { get; set; } = new List<Package>();

}
