using System.Security.Claims;
using app_goconecta.Server.DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthenticationService = app_goconecta.Server.Services.AuthenticationService;

namespace app_goconecta.Server.Controllers.Mvc;

[AllowAnonymous]
public class MvcAuthenticationController(AuthenticationService authenticationService) : Controller
{
    public IActionResult Login() => View();

    public IActionResult AccessDenied()
    {
        ViewBag.ErrorTitle = "Acesso Negado";
        ViewBag.ErrorMessage = "Apenas administradores podem acessar esta página.";
        return View("Login");
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(UserLoginDTO loginDto)
    {
        if (!ModelState.IsValid) return View(loginDto);
        
        try
        {
            var claimIdentity = await authenticationService.AuthenticateCredentialsAsync(loginDto.Email, loginDto.Password, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties { IsPersistent = true };
            
            await HttpContext.SignInAsync(
                new ClaimsPrincipal(claimIdentity),
                authProperties
            );
            
            return RedirectToAction("Index", "MvcHome");
        }
        catch (UnauthorizedAccessException ex)
        {
            ModelState.AddModelError(string.Empty, ex.Message);
            return View(loginDto);
        }
    }
}