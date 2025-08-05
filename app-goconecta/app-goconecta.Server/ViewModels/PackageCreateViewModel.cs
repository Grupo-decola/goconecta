using app_goconecta.Server.Models;

namespace app_goconecta.Server.ViewModels;

public class PackageCreateViewModel
{
    public Package Package { get; set; } = new()
    {
        Title = string.Empty,
        Description = string.Empty,
        Destination = string.Empty
    };

    public List<MediaCreateViewModel> Media { get; set; } = Enumerable.Repeat(new MediaCreateViewModel(){Title = string.Empty}, 3).ToList();
    public List<Hotel> Hotels { get; set; } = new();
}