using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.Models;

public class Package
{
    public int Id { get; set; }
    
    [Required(ErrorMessage = "O título é obrigatório")]
    [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres")]
    [Display(Name = "Título")]
    public string Title { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "A descrição é obrigatória")]
    [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres")]
    [Display(Name = "Descrição")]
    public string Description { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "O destino é obrigatório")]
    [StringLength(100, ErrorMessage = "O destino deve ter no máximo 100 caracteres")]
    [Display(Name = "Destino")]
    public string Destination { get; set; } = string.Empty;
    
    [Range(1, 365, ErrorMessage = "A duração deve ser entre 1 e 365 dias")]
    [Display(Name = "Duração (dias)")]
    public int DurationDays { get; set; }
    
    [DataType(DataType.Date)]
    [Display(Name = "Data de início")]
    public DateTime AvailabilityStartDate { get; set; } = default;
    
    [DataType(DataType.Date)]
    [Display(Name = "Data de término")]
    public DateTime AvailabilityEndDate { get; set; } = default;
    
    [Range(0, double.MaxValue, ErrorMessage = "O preço deve ser positivo")]
    [DataType(DataType.Currency)]
    [Display(Name = "Preço para adultos")]
    public decimal PriceAdults { get; set; }
    
    [Range(0, double.MaxValue, ErrorMessage = "O preço deve ser positivo")]
    [DataType(DataType.Currency)]
    [Display(Name = "Preço para crianças")]
    public decimal PriceChildren { get; set; }
    
    [Display(Name = "Hotel")]
    public int HotelId { get; set; }
    
    public Hotel? Hotel { get; set; }
    
    public ICollection<Media> Media { get; set; } = new List<Media>();
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    
    public int TotalRatings()
        => Ratings.Count;
    
    public double AverageRating()
        => TotalRatings() > 0 ? Math.Round(Ratings.Average(r => r.Stars), 2) : 0;
    
    public Dictionary<int, int> RatingDistribution()
        => Ratings.GroupBy(x => x.Stars)
            .OrderBy(g => g.Key)
            .ToDictionary(g => g.Key, g => (int) Math.Round((double) g.Count() / TotalRatings() * 100));
}