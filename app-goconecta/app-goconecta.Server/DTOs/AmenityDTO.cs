using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class AmenityDTO 
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public static AmenityDTO FromModel(Amenity amenity)
    {
        return new AmenityDTO()
        {
            Id = amenity.Id,
            Name = amenity.Name,
        };
    }
    
}