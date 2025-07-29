using System.ComponentModel.DataAnnotations;

namespace app_goconecta.Server.DTOs;

public class ReservationCreateDTO
{
    public DateTime ReservationDate { get; set; }
    
    public int UserId { get; set; } // TEMPORARY: Replace with JWT user ID extraction
    
    public int PackageId { get; set; }
    
    [Range(1, int.MaxValue)]
    public int NumOfAdults { get; set; }
    
    [Range(0, int.MaxValue)]
    public int NumOfChildren { get; set; }
}