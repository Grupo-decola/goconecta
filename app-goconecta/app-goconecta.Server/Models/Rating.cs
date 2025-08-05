using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.Models;

public class Rating
{
    public int Id { get; set; }
    
    [Display(Name = "Data de Criação")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    [Display(Name = "Estrelas")]
    public int Stars { get; set; }
    
    [Display(Name = "Comentário")]
    public string? Comment { get; set; }
    
    [Display(Name = "Usuário")]
    public int UserId { get; set; }
    public User? User { get; set; } = null!;
    
    [Display(Name = "Pacote")]
    public int PackageId { get; set; }
    public Package? Package { get; set; } = null!;
}