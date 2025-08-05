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

        var hotelDtos= (await query.ToListAsync()).Select(HotelDTO.FromModel).ToList();
        
        foreach (var hotelDto in hotelDtos)
        {
            if (hotelDto.Image == null || string.IsNullOrWhiteSpace(hotelDto.Image.Path)) continue;
            hotelDto.Image!.Path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/{hotelDto.Image.Path!}";
        }
        
        return Ok(hotelDtos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<HotelDetailDto>> GetById(int id)
    {
        var hotel = await context.Hotels
            .Include(h => h.Amenities)
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hotel == null)
            return NotFound();
        
        var hotelDetailDto = HotelDetailDto.FromModel(hotel);
        
        foreach (var mediaDto in hotelDetailDto.Images)
        {
            if (mediaDto.Path == null || string.IsNullOrWhiteSpace(mediaDto.Path)) continue;
            mediaDto.Path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/{mediaDto.Path}";
        }

        return Ok(hotelDetailDto);
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