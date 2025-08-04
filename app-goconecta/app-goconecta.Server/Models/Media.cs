namespace app_goconecta.Server.Models;

public class Media
{
    public int Id { get; set; }
    public string? Path { get; set; }
    public string? Title { get; set; }
    public string? Type { get; set; } // Video, Imagem, ... -> para filtragem posterior a query
    
    public int PackageId { get; set; }
    public Package? Package { get; set; }
}