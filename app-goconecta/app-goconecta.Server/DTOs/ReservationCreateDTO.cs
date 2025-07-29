using System.ComponentModel.DataAnnotations;
using app_goconecta.Server.Models;

namespace app_goconecta.Server.DTOs;

public class ReservationCreateDTO
{
    public int PackageId { get; set; }
    public DateTime ReservationDate { get; set; }
    public IEnumerable<Guest> Guests { get; set; } = new List<Guest>();
}