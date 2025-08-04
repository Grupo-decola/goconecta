using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.DTOs.Package;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class RatingsController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IReadOnlyList<RatingDTO>>> GetAll()
        => Ok(
            (await context.Ratings
                .Include(r => r.User)
                .ToListAsync())
            .Select(RatingDTO.FromModel)
            .ToList()
        );

    [HttpGet("{Id:int}")]
    [AllowAnonymous]
    public async Task<ActionResult<IReadOnlyList<RatingDTO>>> GetById(int Id)
    {
        var rating = await context.Ratings
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == Id);

        if (rating == null) return NotFound();
        
        return Ok(RatingDTO.FromModel(rating));
    }

    [HttpPost]
    public async Task<ActionResult<RatingDTO>> Rate(RatingCreateDTO createDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var currentUserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "UserId")!.Value);
        
        var newRating = new Rating
        {
            Stars = createDto.Stars,
            Comment = createDto.Comment,
            PackageId = createDto.PackageId,
            UserId = currentUserId
        };
        
        await context.Ratings.AddAsync(newRating);
        await context.SaveChangesAsync();
        
        await context.Entry(newRating).Reference(r => r.User).LoadAsync();
        
        return CreatedAtAction(nameof(GetById), RatingDTO.FromModel(newRating));
    }
}