using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.Models;

public class User
{
    public int Id { get; set; }
    
    [Display(Name = "Nome")]
    public required string Name { get; set; }
    
    [Display(Name = "E-mail")]
    public required string Email { get; set; }
    
    [Display(Name = "Senha")]
    public required string Password { get; set; }
    
    [Display(Name = "Telefone")]
    public required string Phone { get; set; }
    
    [Display(Name = "CPF/Passaporte")]
    public required string CpfPassport { get; set; }
    
    [Display(Name = "Função")]
    public required UserRole Role { get; set; }

    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
}