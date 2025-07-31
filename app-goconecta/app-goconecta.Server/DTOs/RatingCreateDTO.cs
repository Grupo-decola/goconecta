namespace app_goconecta.Server.DTOs;

public class RatingCreateDTO
{
    public int Stars { get; set; }
    public string? Comment { get; set; }
    public int PackageId { get; set; }
}