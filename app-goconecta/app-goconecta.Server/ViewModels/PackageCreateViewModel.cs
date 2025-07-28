using app_goconecta.Server.Models;

namespace app_goconecta.Server.ViewModels;

public class PackageCreateViewModel
{
    public Package Package { get; set; } = new Package()
    {
        Title = String.Empty,
        Description = String.Empty,
        Destination = String.Empty
    };

    public MediaCreateViewModel Media1 { get; set; } = new MediaCreateViewModel { Title = "", File = null };
    public MediaCreateViewModel Media2 { get; set; } = new MediaCreateViewModel { Title = "", File = null };
    public MediaCreateViewModel Media3 { get; set; } = new MediaCreateViewModel { Title = "", File = null };
    
    public List<MediaCreateViewModel> Media { get; set; }
    
    public List<Hotel> Hotels { get; set; } = new List<Hotel>();

    public PackageCreateViewModel()
    {
        Media = [
            Media1, Media2, Media3
        ];
    }
}