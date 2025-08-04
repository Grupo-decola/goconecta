using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs.Package;

public class RatingDTO
{
    public UserDTO User { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public int Stars { get; set; }
    public string? Comment { get; set; }
    
    public static RatingDTO FromModel(Rating rating)
    {
        return new RatingDTO
        {
            User = UserDTO.FromModel(rating.User!),
            CreatedAt = rating.CreatedAt,
            Stars = rating.Stars,
            Comment = rating.Comment
        };
    }
}