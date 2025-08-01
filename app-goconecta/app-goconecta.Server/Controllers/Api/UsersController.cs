using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext context, UserService userService) : ControllerBase
{
    private async Task<User?> _GetCurrentUser()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId");
        if (userIdClaim == null) return null;

        var userId = int.Parse(userIdClaim.Value);
        return await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }
    
    [HttpGet("/api/User")]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var currentUser = await _GetCurrentUser();
        if (currentUser == null) return Unauthorized();
        return UserDTO.FromModel(currentUser);
    }

    [HttpGet("/api/User/Reservations")]
    public async Task<ActionResult<IReadOnlyList<ReservationDTO>>> GetCurrentUserReservations()
    {
        var currentUser = await _GetCurrentUser();
        if (currentUser == null) return Unauthorized();
        var reservations = await context.Reservations
            .Where(r => r.UserId == currentUser.Id)
            .Include(r => r.Package)
            .ThenInclude(p => p.Hotel)
            .ToListAsync();
        return reservations.Select(ReservationDTO.FromModel).ToList();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateDTO createDto)
    {
        if (!ModelState.IsValid) { return BadRequest(ModelState); }

        try
        {
            await userService.CreateAsync(createDto, "user");
            return Created();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}