using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Extensions;
using app_goconecta.Server.Models;
using app_goconecta.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class MvcPackagesController(AppDbContext context) : Controller
{
    public async Task<IActionResult> Index()
    {
        return View(await context.Packages.ToListAsync());
    }

    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
            return NotFound();

        var package = await context.Packages
            .Include(p=> p.Hotel)
            .FirstOrDefaultAsync(m => m.Id == id);
        
        if (package == null)
            return NotFound();

        return View(package);
    }

    public IActionResult Create()
    {
        var hotels = context.Hotels.ToList();
        var viewModel = new PackageCreateViewModel()
        {
            Hotels = hotels
        };
        
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(PackageCreateViewModel viewModel)
    {
        try
        {
            viewModel.Package.Media = viewModel.Media.Where( m => m.File is {Length: > 0}).Select(async m =>
            {
                var newMedia = new Media
                {
                    Path =
                        $"assets/media/{m.File.GetExtensionType()}/{Guid.NewGuid()}-{m.File.GetName()}.{m.File.GetExtension()}",
                    Title = m.File!.Name,
                    Type = m.File.GetExtensionType()
                };
                
                var fullPath = $"wwwroot/{newMedia.Path}";
                
                if (!Directory.Exists(Path.GetDirectoryName(fullPath)))
                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
                
                await using var stream = new FileStream(fullPath, FileMode.Create);
                await m.File!.CopyToAsync(stream);
                
                return newMedia;
            }).Select(t => t.Result).ToList();
            
            context.Add(viewModel.Package);
            await context.SaveChangesAsync();
            
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            viewModel.Hotels = context.Hotels.ToList();
            return View(viewModel);
        }
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
            return NotFound();

        var package = await context.Packages.FindAsync(id);
        
        if (package == null)
            return NotFound();
        
        var editViewModel = new PackageEditViewModel
        {
            Package = package,
            Hotels = context.Hotels.ToList()
        };
        
        return View(editViewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(PackageEditViewModel viewModel)
    {
        if (!ModelState.IsValid) return View(viewModel);
        try
        {
            context.Update(viewModel.Package);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PackageExists(viewModel.Package.Id))
                return NotFound();
        }
        
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
            return NotFound();

        var package = await context.Packages
            .FirstOrDefaultAsync(m => m.Id == id);
        
        if (package == null)
            return NotFound();

        return View(package);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var package = await context.Packages.FindAsync(id);
        if (package != null)
            context.Packages.Remove(package);

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            ModelState.AddModelError(string.Empty, "Não foi possível excluir o pacote. Ele pode estar associado a outras entidades.");
            return View(package);
        }
        catch (Exception e)
        {
            ModelState.AddModelError(string.Empty, "Erro ao excluir o pacote: " + e.Message);
            return View(package);
        }

        return RedirectToAction(nameof(Index));
    }

    private bool PackageExists(int id)
        => context.Packages.Any(e => e.Id == id);
}