using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Models;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class UsersController(AppDbContext context, UserService userService) : Controller
{
    public async Task<IActionResult> Index()
        => View(await context.Users.ToListAsync());

    public async Task<IActionResult> Details(int? id)
    {
        var user = await context.Users.FirstOrDefaultAsync(m => m.Id == id);
        if (user == null) return NotFound();
        return View(user);
    }

    public IActionResult Create()
        => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Name,Email,Password,Phone,CpfPassport,Role")] User user)
    {
        if (!ModelState.IsValid) return View(user);
        
        try
        {
            await userService.CreateAsync(user);
            return RedirectToAction(nameof(Index));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    public async Task<IActionResult> Edit(int? id)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound();
        return View(user);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Email,Password,Phone,CpfPassport,Role")] User user)
    {
        if (!ModelState.IsValid) return View(user);
        if (id != user.Id || !UserExists(user.Id)) return NotFound();
        context.Update(user);
        await context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int? id)
    {
        var user = await context.Users .FirstOrDefaultAsync(m => m.Id == id);
        if (user == null) { return NotFound(); }
        return View(user);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return RedirectToAction(nameof(Index));
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool UserExists(int id)
        => context.Users.Any(e => e.Id == id);
}