using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace app_goconecta.Server.Services;

public class UserService(IConfiguration configuration, AppDbContext dbContext)
{
    public async Task<ClaimsIdentity> AuthenticateCredentialsAsync(string email, string password, string authenticationScheme)
    {
        var user = await dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        
        if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            throw new UnauthorizedAccessException("Usuário ou senha inválidos.");
        }
        
        var claimsIdentity = new ClaimsIdentity([
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("Store", user.Role)
        ], authenticationScheme);

        return claimsIdentity;
    }
    public async Task<object> AuthenticateJwtAsync(string email, string password)
    {
        var claimsIdentity = await AuthenticateCredentialsAsync(email, password, JwtBearerDefaults.AuthenticationScheme);
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Secret"] ?? throw new InvalidOperationException("JWT Secret não configurado."));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claimsIdentity,
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        
        return new
        {
            claimsIdentity.Name,
            Token = tokenString
        };
    }
    
    public async Task<User> RegisterAsync(UserCreateDTO createDto, string role)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == createDto.Email))
        {
            throw new InvalidOperationException("Email já está em uso.");
        }

        var newUser = new User
        {
            Name = createDto.Name,
            Email = createDto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(createDto.Password),
            Phone = createDto.Phone,
            CpfPassport = createDto.CpfPassport,
            Role = role
        };
        
        dbContext.Users.Add(newUser);
        await dbContext.SaveChangesAsync();
        
        return newUser;
    }
}