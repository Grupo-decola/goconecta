using app_goconecta.Server.Models;

namespace app_goconecta.Server.ViewModels;

public class PackageEditViewModel
{
    public Package Package { get; set; }
    public List<Hotel> Hotels { get; set; }

    public PackageEditViewModel()
    {
        Package = new Package()
        {
            Title = String.Empty,
            Description = String.Empty,
            Destination = String.Empty
        };
        Hotels = new List<Hotel>();
    }
}