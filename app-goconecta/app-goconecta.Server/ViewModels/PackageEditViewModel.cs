using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Http; // Para IFormFile

namespace app_goconecta.Server.ViewModels;

public class PackageEditViewModel
{
    public Package Package { get; set; }
    public List<Hotel> Hotels { get; set; }
    public List<Media> Media { get; set; } = new();

    // Para upload de nova imagem
    public string? NewMediaTitle { get; set; }
    public IFormFile? NewMediaFile { get; set; }

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