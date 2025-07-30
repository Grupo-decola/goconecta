using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Extensions;
using app_goconecta.Server.Models;
using app_goconecta.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class PackagesController : Controller
{
    private readonly AppDbContext _context;

    public PackagesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: Packages
    public async Task<IActionResult> Index()
    {
        return View(await _context.Packages.ToListAsync());
    }

    // GET: Packages/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var package = await _context.Packages
            .FirstOrDefaultAsync(m => m.Id == id);
        if (package == null)
        {
            return NotFound();
        }

        return View(package);
    }

    // GET: Packages/Create
    public IActionResult Create()
    {
        var hotels = _context.Hotels.ToList();
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
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            _context.Add(viewModel.Package);
            await _context.SaveChangesAsync();

            foreach (var media in viewModel.Media)
            {
                if (media.File is not { Length: > 0 }) { continue; };

                var filePath = $"assets/media/{media.File.GetExtensionType()}/{Guid.NewGuid()}-{media.File.GetName()}.{media.File.GetExtension()}";
                var fullPath = $"wwwroot/{filePath}";
                
                if (!Directory.Exists(Path.GetDirectoryName(fullPath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
                }
                
                await using var stream = new FileStream(fullPath, FileMode.Create);
                await media.File.CopyToAsync(stream);

                var newMedia = new Media
                {
                    Path = filePath,
                    Title = media.Title,
                    Type = media.File.GetExtensionType(),
                    PackageId = viewModel.Package.Id,
                };
                
                _context.Media.Add(newMedia);
            }
            
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return RedirectToAction(nameof(Index));
        }
        catch
        {
            await transaction.RollbackAsync();
            viewModel.Hotels = _context.Hotels.ToList();
            return View(viewModel);
        }
    }

    // GET: Packages/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var package = await _context.Packages.FindAsync(id);
        if (package == null)
        {
            return NotFound();
        }
        return View(package);
    }

    // POST: Packages/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Destination,DurationDays,AvailabilityStartDate,AvailabilityEndDate,Price")] Package package)
    {
        if (id != package.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                _context.Update(package);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageExists(package.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(package);
    }

    // GET: Packages/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var package = await _context.Packages
            .FirstOrDefaultAsync(m => m.Id == id);
        if (package == null)
        {
            return NotFound();
        }

        return View(package);
    }

    // POST: Packages/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var package = await _context.Packages.FindAsync(id);
        if (package != null)
        {
            _context.Packages.Remove(package);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool PackageExists(int id)
    {
        return _context.Packages.Any(e => e.Id == id);
    }
}