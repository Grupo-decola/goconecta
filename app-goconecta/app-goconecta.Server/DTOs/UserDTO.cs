using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required string CpfPassport { get; set; }
    public required string Role { get; set; }
    
    public static UserDTO FromModel(User user)
    {
        return new UserDTO
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Phone = user.Phone,
            CpfPassport = user.CpfPassport,
            Role = user.Role.ToString()
        };
    }
}