using app_goconecta.Server.Models;

namespace app_goconecta.Server.ViewModels;

public class PackageCreateViewModel
{
    public Package package { get; set; } = new Package()
    {
        Title = String.Empty,
        Description = String.Empty,
        Destination = String.Empty
    };
    public List<IFormFile> Images { get; set; } = new List<IFormFile>();
    
    public List<Hotel> Hotels { get; set; } = new List<Hotel>();
}