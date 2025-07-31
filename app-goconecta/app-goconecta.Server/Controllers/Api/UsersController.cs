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
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserDTO>>> GetAll()
        => (await context.Users.AsNoTracking().ToListAsync()).Select(UserDTO.FromModel).ToList();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDTO>> GetById(int id)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound();
        return Ok(UserDTO.FromModel(user));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateDTO createDto)
    {
        if (!ModelState.IsValid) { return BadRequest(ModelState); }

        try
        {
            var newUser = await userService.CreateAsync(createDto, "user");
            return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, UserDTO.FromModel(newUser));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}