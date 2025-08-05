using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.Models;

public class Hotel
{
    public int Id { get; set; }
    
    [Display(Name = "Nome")]
    public string? Name { get; set; }

    [Display(Name = "Descrição")]
    public string? Description { get; set; }

    [Display(Name = "Avaliação")]
    public int Rating { get; set; }

    [Display(Name = "Quartos Disponíveis")]
    public int RoomsAvailable { get; set; }
    
    [Display(Name = "Região")]
    public string? Region { get; set; }

    [Display(Name = "Endereço")]
    public string? Address { get; set; }

    public ICollection<Media> Media { get; set; } = new List<Media>();
    public ICollection<Package> Packages { get; set; } = new List<Package>();
    public ICollection<Amenity> Amenities { get; set; } = new List<Amenity>();
}
