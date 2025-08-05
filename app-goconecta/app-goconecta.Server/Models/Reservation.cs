namespace app_goconecta.Server.Models;

public class Reservation
{
    public int Id { get; init; }
    public string ReservationNumber { get; init; }
    public DateTime ReservationDate { get; set; }

    private ReservationStatus _status;
    public required ReservationStatus Status
    {
        get => GetActualStatus();
        set => SetStatus(value);
    }

    public IEnumerable<Guest> Guests { get; init; }
    
    public int UserId { get; set; }
    public User? User { get; set; }
    
    public int PackageId { get; set; }
    public Package? Package { get; set; }

    public Reservation(int userId, int packageId, DateTime reservationDate) : this()
    {
        ReservationDate = reservationDate;
        UserId = userId;
        PackageId = packageId; 
    }
    
    public Reservation()
    {
        ReservationNumber = $"RES{DateTime.UtcNow:yyyyMMddHHmmssfff}";
        Status = ReservationStatus.Pending;
        Guests = new List<Guest>();
    }

    public int GetNumberOfAdults()
        => Guests.Count(g => g.IsAdult);
    
    public int GetNumberOfChildren()
        => Guests.Count(g => !g.IsAdult);
    
    public decimal GetTotalPrice()
        => Package == null ? 0 : (GetNumberOfAdults() * Package.PriceAdults) + (GetNumberOfChildren() * Package.PriceChildren);
    
    public ReservationStatus GetActualStatus()
    {
        return _status switch
        {
            ReservationStatus.Pending
                when ReservationDate <= DateTime.UtcNow
                => ReservationStatus.Cancelled,
            ReservationStatus.Confirmed
                when Package != null && ReservationDate.AddDays(Package.DurationDays) <= DateTime.UtcNow
                => ReservationStatus.Completed,
            _ => _status
        };
    }

    public void SetStatus(ReservationStatus newStatus)
    {
        if (newStatus == _status)
            return;
        
        if (newStatus == ReservationStatus.Pending)
            throw new InvalidOperationException("Transição inválida: não é possível retornar ao status inicial (pendente).");
        
        if (newStatus == ReservationStatus.Confirmed && _status != ReservationStatus.Pending)
            throw new InvalidOperationException("Transição inválida: só é possível confirmar uma reserva pendente.");
        
        if (newStatus == ReservationStatus.Completed && _status != ReservationStatus.Confirmed)
            throw new InvalidOperationException("Transição inválida: só é possível completar uma reserva confirmada.");
        
        if (newStatus == ReservationStatus.Cancelled && _status == ReservationStatus.Completed)
            throw new InvalidOperationException("Transição inválida: não é possível cancelar uma reserva já completada.");
        
        _status = newStatus;
    }
    
    public void UpdateStatus()
    {
        _status = GetActualStatus();
    }
}
