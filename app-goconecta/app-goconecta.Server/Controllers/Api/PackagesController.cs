using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.DTOs.Package;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
        
        if (filter.AvailabilityStartDate != null)
        {
            query = query.Where(p => p.AvailabilityEndDate >= filter.AvailabilityStartDate.Value);
        }

        if (filter.AvailabilityEndDate != null)
        {
            query = query.Where(p => p.AvailabilityStartDate <= filter.AvailabilityEndDate.Value);   
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

        return packageDtos;
    }
    

    [HttpGet("{id}")]
    public async Task<ActionResult<PackageDetailDTO>> GetById(int id)
    {
        var package = await context.Packages
            .AsNoTracking()
            .Include(p => p.Ratings)
            .Include(p => p.Hotel)
            .ThenInclude(h => h.Amenities)
            .Include(p => p.Media)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (package == null) return NotFound();
        var packageDetailDto = PackageDetailDTO.FromModel(package);
        
        foreach (var mediaDto in packageDetailDto.Images)
        {
            if (mediaDto.Path == null || string.IsNullOrWhiteSpace(mediaDto.Path)) continue;
            mediaDto.Path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/{mediaDto.Path}";
        }
        
        return Ok(packageDetailDto);
        
    }
}