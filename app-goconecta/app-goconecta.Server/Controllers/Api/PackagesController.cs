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
public class PackagesController : ControllerBase
{
    private readonly AppDbContext _context;

    public PackagesController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PackageDTO>>> GetAll(
        [FromQuery] PackageQueryFilter filter,
        [FromQuery] PaginationQuery pagination)
    {
        var query = _context.Packages
            .Include(p => p.Hotel)
                .ThenInclude(h => h.Amenities)
            .AsQueryable();

        if (!string.IsNullOrEmpty(filter.Destination))
        {
            query = query.Where(p => EF.Functions.Like(p.Destination, $"%{filter.Destination}%"));
        }
        if (filter.MinPrice.HasValue)
        {
            if(!filter.IsValid())
            {
                return BadRequest("Invalid price range.");
            }
            query = query.Where(p => p.PriceAdults >= filter.MinPrice.Value);
        }
        if (filter.MaxPrice.HasValue)
        {
            if(!filter.IsValid())
            {
                return BadRequest("Invalid price range.");
            }
            query = query.Where(p => p.PriceAdults <= filter.MaxPrice.Value);
        }

        if (filter.SelectedAmenityIds != null && filter.SelectedAmenityIds.Any())
        {
            var amenityIds = filter.SelectedAmenityIds;
            query = query.Where(p =>
                p.Hotel.Amenities.Any() &&
                amenityIds.All(id => p.Hotel.Amenities.Select(a => a.Id).Contains(id))
            );
        }

        query = query.Skip((pagination.Page -1) * pagination.PageSize).Take(pagination.PageSize);
        // Return the filtered list of packages
        return (
                await query.AsNoTracking()
                    .ToListAsync()
            )
            .Select(PackageDTO.FromModel)
            .ToList();
    }
    

    [HttpGet("{id}")]
    public async Task<ActionResult<PackageDetailDTO>> GetById(int id)
    {
        var package = await _context.Packages
            .AsNoTracking()
            .Include(p => p.Hotel)
            .Include(p => p.Media)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (package == null) return NotFound();
        var packageDetailDto = PackageDetailDTO.FromModel(package);
        return Ok(packageDetailDto);
        
    }
}