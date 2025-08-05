using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Models;

[Owned]
public class Media
{
    public int Id { get; set; }
    public string? Path { get; set; }
    public string? Title { get; set; }
    public string? Type { get; set; }
}