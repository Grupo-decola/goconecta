using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly AppDbContext _context;

    public HotelsController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<HotelDTO>>> GetAll([FromQuery] List<int>? amenitiesIds = null)
    {
        var query = _context.Hotels
            .Include(h => h.Amenities)
            .AsQueryable();

        if (amenitiesIds != null && amenitiesIds.Any())
        {
            query = query.Where(h => amenitiesIds.All(id => h.Amenities.Any(a => a.Id == id)));
        }

        return (await query.ToListAsync()).Select(HotelDTO.FromModel).ToList();
    }
}