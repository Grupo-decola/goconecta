using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Extensions;
using app_goconecta.Server.Models;
using app_goconecta.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class MvcPackagesController : Controller
{
    private readonly AppDbContext _context;

    public MvcPackagesController(AppDbContext context)
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
            .Include(p => p.Hotel)
            .Include(p => p.Media)
            .AsNoTracking()
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

        var package = await _context.Packages
            .Include(p => p.Media)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (package == null)
        {
            return NotFound();
        }
        var editViewModel = new PackageEditViewModel
        {
            Package = package,
            Hotels = _context.Hotels.ToList(),
            Media = package.Media.ToList()
        };
        return View(editViewModel);
    }

    // POST: Packages/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(PackageEditViewModel viewModel)
    {
        if (!ModelState.IsValid)
        {
            // Apenas recarrega as listas auxiliares, mantendo os dados digitados
            viewModel.Hotels = await _context.Hotels.ToListAsync();
            viewModel.Media = await _context.Media.Where(m => m.PackageId == viewModel.Package.Id).ToListAsync();
            return View(viewModel);
        }

        // Busca o pacote original do banco
        var packageDb = await _context.Packages.FirstOrDefaultAsync(p => p.Id == viewModel.Package.Id);
        if (packageDb == null)
        {
            return NotFound();
        }

        // Atualiza apenas os campos editáveis
        packageDb.Title = viewModel.Package.Title;
        packageDb.Description = viewModel.Package.Description;
        packageDb.Destination = viewModel.Package.Destination;
        packageDb.HotelId = viewModel.Package.HotelId;
        packageDb.DurationDays = viewModel.Package.DurationDays;
        packageDb.AvailabilityStartDate = viewModel.Package.AvailabilityStartDate;
        packageDb.AvailabilityEndDate = viewModel.Package.AvailabilityEndDate;
        packageDb.PriceAdults = viewModel.Package.PriceAdults;
        packageDb.PriceChildren = viewModel.Package.PriceChildren;
        
        // Upload de nova imagem, se fornecida
        if (viewModel.NewMediaFile != null && viewModel.NewMediaFile.Length > 0)
        {
            var fileExt = Path.GetExtension(viewModel.NewMediaFile.FileName);
            var fileType = viewModel.NewMediaFile.GetExtensionType();
            var fileName = $"{Guid.NewGuid()}{fileExt}";
            var filePath = $"assets/media/{fileType}/{fileName}";
            var fullPath = Path.Combine("wwwroot", filePath.Replace("/", Path.DirectorySeparatorChar.ToString()));

            if (!Directory.Exists(Path.GetDirectoryName(fullPath)))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await viewModel.NewMediaFile.CopyToAsync(stream);
            }

            var newMedia = new Media
            {
                Path = filePath,
                Title = viewModel.NewMediaTitle ?? Path.GetFileNameWithoutExtension(viewModel.NewMediaFile.FileName),
                Type = fileType,
                PackageId = packageDb.Id
            };
            _context.Media.Add(newMedia);
        }

        try
        {
            await _context.SaveChangesAsync();
            // Redireciona para a lista de pacotes após salvar
            return RedirectToAction("Index");
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PackageExists(viewModel.Package.Id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        // return RedirectToAction(nameof(Edit), new { id = packageDb.Id });
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

        try
        {
            await _context.SaveChangesAsync();
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

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> RemoveImage(int id)
    {
        var media = await _context.Media.FindAsync(id);
        if (media != null)
        {
            int? packageId = media.PackageId;
            _context.Media.Remove(media);
            await _context.SaveChangesAsync();
            // Opcional: Remover o arquivo físico do disco
            var filePath = Path.Combine("wwwroot", media.Path.Replace("/", Path.DirectorySeparatorChar.ToString()));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            return RedirectToAction("Edit", new { id = packageId });
        }
        return RedirectToAction("Index");
    }

    private bool PackageExists(int id)
    {
        return _context.Packages.Any(e => e.Id == id);
    }
}