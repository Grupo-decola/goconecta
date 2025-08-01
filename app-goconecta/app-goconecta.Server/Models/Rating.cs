using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Models;

public class Rating
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Stars { get; set; }
    public string? Comment { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; } = null!;
    public int PackageId { get; set; }
    public Package? Package { get; set; } = null!;
}