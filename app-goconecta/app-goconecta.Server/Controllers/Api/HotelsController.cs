using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.DTOs.Hotel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class HotelsController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<HotelDTO>>> GetAll([FromQuery] List<int>? amenitiesIds = null)
    {
        var query = context.Hotels
            .Include(h => h.Amenities)
            .AsQueryable();

        if (amenitiesIds != null && amenitiesIds.Any())
        {
            query = query.Where(h => amenitiesIds.All(id => h.Amenities.Any(a => a.Id == id)));
        }

        return (await query.ToListAsync()).Select(HotelDTO.FromModel).ToList();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<HotelDTO>> GetById(int id)
    {
        var hotel = await context.Hotels
            .Include(h => h.Amenities)
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hotel == null)
            return NotFound();

        return HotelDTO.FromModel(hotel);
    }

    [HttpPost]
    public async Task<ActionResult<HotelDTO>> Create([FromBody] HotelCreateDTO hotelCreateDto)
    {
        var hotel = new Models.Hotel
        {
            Name = hotelCreateDto.Name,
            Description = hotelCreateDto.Description,
            Rating = hotelCreateDto.Rating,
            Region = hotelCreateDto.Region,
            Address = hotelCreateDto.Address
        };

        context.Hotels.Add(hotel);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = hotel.Id }, HotelDTO.FromModel(hotel));
    }
}