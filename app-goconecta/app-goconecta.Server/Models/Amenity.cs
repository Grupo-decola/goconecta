namespace app_goconecta.Server.Models;

public class Amenity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
}

