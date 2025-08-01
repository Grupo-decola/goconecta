using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class MediaDTO
{
    public string? Path { get; set; }
    public string? Title { get; set; }

    public static MediaDTO FromModel(Media media)
    {
        return new MediaDTO 
        {
            Path = media.Path,
            Title = media.Title
        };
    }
}