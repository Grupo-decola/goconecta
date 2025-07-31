using app_goconecta.Server.Models;

namespace app_goconecta.Server.ViewModels;

public class PackageEditViewModel
{
    public Package Package { get; set; }
    // public MediaCreateViewModel Media1 { get; set; }
    // public MediaCreateViewModel Media2 { get; set; }
    // public MediaCreateViewModel Media3 { get; set; }
    // public List<MediaCreateViewModel> Media { get; set; }
    public List<Hotel> Hotels { get; set; }

    public PackageEditViewModel()
    {
        Package = new Package()
        {
            Title = String.Empty,
            Description = String.Empty,
            Destination = String.Empty
        };
        // Media1 = new MediaCreateViewModel { Title = "", File = null };
        // Media2 = new MediaCreateViewModel { Title = "", File = null };
        // Media3 = new MediaCreateViewModel { Title = "", File = null };
        // Media = [
        //     Media1, Media2, Media3
        // ];
        Hotels = new List<Hotel>();
    }
}