using app_goconecta.Server.Data;
using app_goconecta.Server.Models;
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
    public async Task<ActionResult<IReadOnlyList<Package>>> GetAll([FromQuery] PackageQueryFilter filter, [FromQuery] PaginationQuery pagination)
    {
        var query = _context.Packages.AsQueryable();
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
            query = query.Where(p => p.Price >= filter.MinPrice.Value);
        }
        if (filter.MaxPrice.HasValue)
        {
            if(!filter.IsValid())
            {
                return BadRequest("Invalid price range.");
            }
            query = query.Where(p => p.Price <= filter.MaxPrice.Value);
        }

        
        query = query.Skip((pagination.Page -1) * pagination.PageSize).Take(pagination.PageSize);
        // Return the filtered list of packages
        return await query.AsNoTracking().ToListAsync();
    }
    

    [HttpGet("{id}")]
    public async Task<ActionResult<Package>> GetById(int id)
    {
        var package = await _context.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (package == null)
        {
            return NotFound();
        }
        return Ok(package);
        
    }
}