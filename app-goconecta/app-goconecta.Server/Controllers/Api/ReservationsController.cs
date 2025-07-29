using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReservationsController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ReservationDTO>>> GetAll()
    {
        return (await _context.Reservations.
            Include(r => r.Package).
            ThenInclude(p =>p.Hotel).
            ToListAsync()).Select(ReservationDTO.FromModel).ToList();
    }

    [HttpGet("{id}", Name = "GetReservationById")]
    public async Task<ActionResult<ReservationDTO>> GetById(int id)
    {
        var reservation = await _context.Reservations
            .Include(r => r.Package)
            .ThenInclude(p => p.Hotel)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (reservation == null)
        {
            return NotFound();
        }
        return Ok(ReservationDTO.FromModel(reservation));
    }
    
    [HttpPost]
    public async Task<ActionResult<ReservationDTO>> Create(ReservationCreateDTO createDto)
    {
        if ((await _context.Users.FirstOrDefaultAsync(u => u.Id == createDto.UserId)) == null)
        {
            return BadRequest("User not found.");
        }
        
        if ((await _context.Packages.FirstOrDefaultAsync(p => p.Id == createDto.PackageId)) == null)
        {
            return BadRequest("Package not found.");
        }
        
        if (createDto.ReservationDate < DateTime.UtcNow)
        {
            return BadRequest("Reservation date cannot be in the past.");
        }
        
        var reservation = new Reservation
        {
            ReservationNumber = $"RES{createDto.PackageId}-{Guid.NewGuid()}",
            ReservationDate = createDto.ReservationDate,
            Status = "Pending",
            NumOfAdults = createDto.NumOfAdults,
            NumOfChildren = createDto.NumOfChildren,
            UserId = createDto.UserId,
            PackageId = createDto.PackageId
        };

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();
        
        await _context.Entry(reservation).Reference(r => r.Package).LoadAsync();
        await _context.Entry(reservation.Package).Reference(p => p.Hotel).LoadAsync();
        
        return CreatedAtRoute("GetReservationById", new { id = reservation.Id }, ReservationDTO.FromModel(reservation));
    }
}