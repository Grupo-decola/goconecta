using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs.Package;

public class RatingDTO
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public static RatingDTO FromModel(Rating rating)
    {
        return new RatingDTO
        {
            Id = rating.Id,
            UserName = rating.User!.Name,
            Comment = rating.Comment!,
            Rating = rating.Stars,
            CreatedAt = rating.CreatedAt
        };
    }
}