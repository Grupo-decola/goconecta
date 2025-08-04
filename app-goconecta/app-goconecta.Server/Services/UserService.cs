using System.Security.Claims;
using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Services;

public class UserService(AppDbContext dbContext, EmailService emailService)
{
    public async Task<User> CreateAsync(UserCreateDTO createDto, string role)
    {
        var newUser = new User
        {
            Name = createDto.Name,
            Email = createDto.Email,
            Password = createDto.Password,
            Phone = createDto.Phone,
            CpfPassport = createDto.CpfPassport,
            Role = role
        };
        
        return await CreateAsync(newUser);
    }
    
    public async Task<User> CreateAsync(User newUser)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == newUser.Email))
        {
            throw new InvalidOperationException("Email já está em uso.");
        }
        
        newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
        
        dbContext.Users.Add(newUser);
        await dbContext.SaveChangesAsync();

        await emailService.SendEmailAsync(
            newUser, 
            "Bem-vindo ao GoConecta!",
            $"Olá {newUser.Name},<br/>Sua conta foi criada com sucesso!"
        );
        
        return newUser;
    }
    
    public async Task<User> GetAuthenticatedUserAsync(ClaimsPrincipal user)
    {
        if (user.Identity is not ClaimsIdentity identity || !identity.IsAuthenticated)
        {
            throw new UnauthorizedAccessException("Usuário não autenticado.");
        }

        var email = identity.FindFirst(ClaimTypes.Email)?.Value;
        if (string.IsNullOrEmpty(email))
        {
            throw new UnauthorizedAccessException("Email não encontrado nos claims do usuário.");
        }

        var dbUser = await dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        if (dbUser is null)
        {
            throw new UnauthorizedAccessException("Usuário não encontrado.");
        }

        return dbUser;
    }
}