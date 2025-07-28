using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
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

    [HttpGet("{id}")]
    public async Task<ActionResult<ReservationDTO>> GetById(int id)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }
        return Ok(ReservationDTO.FromModel(reservation));
    }
    
}