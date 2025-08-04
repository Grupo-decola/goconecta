using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.DTOs.Package;

public class RatingCreateDTO
{
    [Range(0, 5, ErrorMessage = "A avaliação deve ser entre 0 e 5 estrelas.")]
    [Required(ErrorMessage = "A avaliação é obrigatória.")]
    public int? Rating { get; set; }
    
    [StringLength(200, ErrorMessage = "O comentário não pode exceder 200 caracteres.")]
    public string? Comment { get; set; }
}