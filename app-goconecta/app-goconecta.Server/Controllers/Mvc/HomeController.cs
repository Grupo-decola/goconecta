using app_goconecta.Server.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize(Policy="RequireAdmin")]
public class HomeController(AppDbContext context) : Controller
{
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        ViewBag.HotelsCount = await context.Hotels.CountAsync();
        ViewBag.PackagesCount = await context.Packages.CountAsync();
        ViewBag.ReservationsCount = await context.Reservations.CountAsync();
        ViewBag.UsersCount = await context.Users.CountAsync();
        return View();
    }
}