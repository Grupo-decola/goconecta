using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext context, UserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<User>>> GetAll()
    {
        return await context.Users.ToListAsync();
    }
    
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] UserCreateDTO createDto)
    {
        if (!ModelState.IsValid) { return BadRequest(ModelState); }

        try
        {
            await userService.RegisterAsync(createDto, "user");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        
        return Ok();
    }
}