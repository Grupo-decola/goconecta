using System.Security.Claims;
using app_goconecta.Server.DTOs;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace app_goconecta.Server.Controllers.Mvc;

[AllowAnonymous]
public class MvcAuthenticationController(UserService userService) : Controller
{
    public IActionResult Login() => View();
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(UserLoginDTO loginDto)
    {
        if (!ModelState.IsValid)
        {
            return View(loginDto);
        }
        
        try
        {
            var claimIdentity = await userService.AuthenticateCredentialsAsync(loginDto.Email, loginDto.Password, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties { IsPersistent = true };
            
            await HttpContext.SignInAsync(
                new ClaimsPrincipal(claimIdentity),
                authProperties
            );
            
            return RedirectToAction("Index", "Home");
        }
        catch (UnauthorizedAccessException ex)
        {
            ModelState.AddModelError(string.Empty, ex.Message);
            return View(loginDto);
        }
    }
}