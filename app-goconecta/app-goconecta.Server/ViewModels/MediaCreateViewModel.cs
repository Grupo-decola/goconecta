namespace app_goconecta.Server.ViewModels;

public class MediaCreateViewModel
{
    public required string Title { get; set; }
    public IFormFile? File { get; set; }
}