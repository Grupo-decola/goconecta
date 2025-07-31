using app_goconecta.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace app_goconecta.Server.DTOs;

public class HotelDTO
{
    public int Id { get; set; }
    
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Rating { get; set; }
    
    public string? Region { get; set; }
    public string? Address { get; set; }
    public List<AmenityDTO> Amenities { get; set; }

    public static HotelDTO FromModel(Hotel hotel)
    {
        return new HotelDTO
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Description = hotel.Description,
            Rating = hotel.Rating,
            Region = hotel.Region,
            Address = hotel.Address,
            Amenities = hotel.Amenities?.Select(AmenityDTO.FromModel).ToList() ?? new List<AmenityDTO>()
        };
    }
    
}