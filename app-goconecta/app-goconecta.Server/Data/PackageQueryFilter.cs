namespace app_goconecta.Server.Data;

public class PackageQueryFilter
{
  // filtro: destino, faixa de preço (mínimo e máximo) e datas (início e/ou fim).
  public string? Destination { get; set; }
  public decimal? MinPrice { get; set; }
  public decimal? MaxPrice { get; set; }
  
  public List<int> SelectedAmenityIds { get; set; } = new List<int>();
  
  public bool IsValid()
  {
    // Verifica se o preço mínimo é maior que o máximo
    if (MinPrice.HasValue && MaxPrice.HasValue && MinPrice.Value > MaxPrice.Value)
    {
      return false;
    }
    return true;
  }
}