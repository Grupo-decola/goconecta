using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Models;

[Owned]
public class Guest
{
    public DateOnly BirthDate { get; set; }
    public string Name { get; set; }
    public string? Email { get; set; }
    public string Cpf { get; set; }
    
    public bool IsAdult => BirthDate <= DateOnly.FromDateTime(DateTime.Now.AddYears(-18));
}