namespace app_goconecta.Server.Models;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Phone { get; set; }
    public required string CpfPassport { get; set; }
    public required string Role { get; set; } // Client, Attendant, Administrator

    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    // public ICollection<Rating> Ratings { get; set; }
}