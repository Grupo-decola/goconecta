using app_goconecta.Server.Data;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Services;

public class UserService(AppDbContext dbContext)
{
    public async Task<User> CreateAsync(User newUser)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == newUser.Email))
        {
            throw new InvalidOperationException("Email já está em uso.");
        }

        newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
        
        dbContext.Users.Add(newUser);
        await dbContext.SaveChangesAsync();
        
        return newUser;
    }

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
}