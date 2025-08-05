using app_goconecta.Server.DTOs.Package;
using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class ReservationDTO
{
    public int Id { get; set; }
    public required string ReservationNumber { get; set; }
    public DateTime ReservationDate { get; set; }
    public required string Status { get; set; }
    public decimal TotalPrice { get; set; }
    public required PackageDTO Package { get; set; }
    
    public static ReservationDTO FromModel(Reservation reservation)
    {
        return new ReservationDTO
        {
            Id = reservation.Id,
            ReservationNumber = reservation.ReservationNumber,
            ReservationDate = reservation.ReservationDate,
            Status = reservation.Status.ToString(),
            TotalPrice = reservation.GetTotalPrice(),
            Package = PackageDTO.FromModel(reservation.Package!)
        };
    }
}