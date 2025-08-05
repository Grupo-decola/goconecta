using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs.Package;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class PackagesController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PackageDTO>>> GetAll(
        [FromQuery] PackageQueryFilter filter,
        [FromQuery] PaginationQuery pagination)
    {
        var query = context.Packages
            .Include(p => p.Ratings)
            .Include(p => p.Hotel)
                .ThenInclude(h => h!.Amenities)
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
        
        if (filter.AvailabilityStartDate != null)
        {
            query = query.Where(p => p.AvailabilityEndDate >= filter.AvailabilityStartDate.Value);
        }

        if (filter.AvailabilityEndDate != null)
        {
            query = query.Where(p => p.AvailabilityStartDate <= filter.AvailabilityEndDate.Value);   
        }
        
        if (filter.SelectedAmenityIds.Count != 0)
        {
            var amenityIds = filter.SelectedAmenityIds;
            query = query.Where(p =>
                p.Hotel!.Amenities.Any() &&
                amenityIds.All(id => p.Hotel.Amenities.Select(a => a.Id).Contains(id))
            );
        }

        query = query.Skip((pagination.Page -1) * pagination.PageSize).Take(pagination.PageSize);
        
        var packageDtos = (
                await query.AsNoTracking()
                    .ToListAsync()
            )
            .Select(PackageDTO.FromModel)
            .ToList();

        foreach (var packageDto in packageDtos)
        {
            if (packageDto.Image == null || string.IsNullOrWhiteSpace(packageDto.Image.Path)) continue;
            packageDto.Image!.Path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/{packageDto.Image.Path!}";
        }

        return Ok(packageDtos);
    }
    

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PackageDetailDTO>> GetById(int id)
    {
        var package = await context.Packages
            .AsNoTracking()
            .Include(p => p.Ratings)
            .Include(p => p.Hotel)
                .ThenInclude(h => h!.Amenities)
            .Include(p => p.Media)
            .FirstOrDefaultAsync(p => p.Id == id);
        
        if (package == null)
            return NotFound();
        
        var packageDetailDto = PackageDetailDTO.FromModel(package);
        
        foreach (var mediaDto in packageDetailDto.Images)
        {
            if (mediaDto.Path == null || string.IsNullOrWhiteSpace(mediaDto.Path)) continue;
            mediaDto.Path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/{mediaDto.Path}";
        }
        
        return Ok(packageDetailDto);
    }
    
    [HttpGet("{id:int}/ratings")]
    public async Task<ActionResult<IReadOnlyList<RatingDTO>>> GetAll(int id)
        => Ok(
            (await context.Ratings
                .Include(r => r.User)
                .Where(r => r.PackageId == id)
                .ToListAsync())
            .Select(RatingDTO.FromModel)
            .ToList()
        );
    
    [HttpPost("{id:int}/ratings")]
    [Authorize("RequireAuthenticated")]
    public async Task<ActionResult<RatingDTO>> Rate(int id, RatingCreateDTO createDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var currentUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "UserId")!.Value);
        
        var newRating = new Rating
        {
            Stars = createDto.Rating!.Value,
            Comment = createDto.Comment,
            PackageId = id,
            UserId = currentUserId
        };
        
        await context.Ratings.AddAsync(newRating);
        await context.SaveChangesAsync();
        
        await context.Entry(newRating).Reference(r => r.User).LoadAsync();
        
        return CreatedAtAction(nameof(GetById), RatingDTO.FromModel(newRating));
    }

    [HttpDelete("{packageId:int}/ratings/{ratingId:int}")]
    [Authorize("RequireAuthenticated")]
    public async Task<IActionResult> DeleteRating(int packageId, int ratingId)
    {
        var rating = await context.Ratings.FirstOrDefaultAsync(r => r.Id == ratingId);
        if (rating == null) return NotFound();
        var currentUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "UserId")!.Value);
        if (currentUserId != rating.UserId) return Unauthorized("Usuário pode remover apenas suas próprias reviews.");
        
        context.Ratings.Remove(rating);
        await context.SaveChangesAsync();
        
        return NoContent();
    }
}
