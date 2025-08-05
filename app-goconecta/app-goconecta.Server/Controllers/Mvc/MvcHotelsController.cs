using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Extensions;
using app_goconecta.Server.Models;
using app_goconecta.Server.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class MvcHotelsController(AppDbContext context) : Controller
{
    public async Task<IActionResult> Index()
        => View(await context.Hotels.ToListAsync());
    

    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
            return NotFound();

        var hotel = await context.Hotels
            .FirstOrDefaultAsync(m => m.Id == id);
        
        if (hotel == null)
            return NotFound();

        return View(hotel);
    }

    public async Task<IActionResult> Create()
    {
        var amenities = await context.Amenities.ToListAsync();
        var viewModel = new HotelEditViewModel
        {
            Amenities = amenities.Select(a => new AmenityCheckboxItem
            {
                Id = a.Id,
                Name = a.Name,
                Checked = false
            }).ToList()
        };
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(HotelEditViewModel viewModel)
    {
        try
        {
            if (!ModelState.IsValid)
                throw new Exception("Dados do formulário inválidos.");
            
            var hotel = new Hotel
            {
                Name = viewModel.Name,
                Description = viewModel.Description,
                Rating = viewModel.Rating,
                RoomsAvailable = viewModel.RoomsAvailable,
                Region = viewModel.Region,
                Address = viewModel.Address,
                Amenities = await context.Amenities.Where(a => viewModel.SelectedAmenityIds.Contains(a.Id)).ToListAsync(),
                Media = viewModel.Media.Where(m => m.File is { Length: > 0 }).Select(async m =>
                {
                    var newMedia = new Media
                    {
                        Path =
                            $"assets/media/{m.File.GetExtensionType()}/{Guid.NewGuid()}-{m.File.GetName()}.{m.File.GetExtension()}",
                        Title = m.File!.FileName.Split('.')[0],
                        Type = m.File.GetExtensionType()
                    };
                
                    var fullPath = $"wwwroot/{newMedia.Path}";
                
                    if (!Directory.Exists(Path.GetDirectoryName(fullPath)))
                        Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
                
                    await using var stream = new FileStream(fullPath, FileMode.Create);
                    await m.File!.CopyToAsync(stream);
                
                    return newMedia;
                }).Select(t => t.Result).ToList()
            };

            context.Add(hotel);
            await context.SaveChangesAsync();
            
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            var amenities = await context.Amenities.ToListAsync();
            viewModel.Amenities = amenities.Select(a => new AmenityCheckboxItem
            {
                Id = a.Id,
                Name = a.Name,
                Checked = viewModel.SelectedAmenityIds.Contains(a.Id)
            }).ToList();
            return View(viewModel);
        }
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
            return NotFound();
        
        var hotel = await context.Hotels.Include(h => h.Amenities).FirstOrDefaultAsync(h => h.Id == id);
        
        if (hotel == null)
            return NotFound();
        
        var amenities = await context.Amenities.ToListAsync();
        
        var viewModel = new HotelEditViewModel
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Description = hotel.Description,
            Rating = hotel.Rating,
            RoomsAvailable = hotel.RoomsAvailable,
            Region = hotel.Region,
            Address = hotel.Address,
            SelectedAmenityIds = hotel.Amenities.Select(a => a.Id).ToList(),
            Amenities = amenities.Select(a => new AmenityCheckboxItem
            {
                Id = a.Id,
                Name = a.Name,
                Checked = hotel.Amenities.Any(ha => ha.Id == a.Id)
            }).ToList()
        };
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, HotelEditViewModel viewModel)
    {
        if (id != viewModel.Id)
            return NotFound();
    
        if (ModelState.IsValid)
        {
            var hotel = await context.Hotels.Include(h => h.Amenities).FirstOrDefaultAsync(h => h.Id == id);
            
            if (hotel == null)
                return NotFound();
        
            hotel.Name = viewModel.Name;
            hotel.Description = viewModel.Description;
            hotel.Rating = viewModel.Rating;
            hotel.RoomsAvailable = viewModel.RoomsAvailable;
            hotel.Region = viewModel.Region;
            hotel.Address = viewModel.Address;
            hotel.Amenities = await context.Amenities.Where(a => viewModel.SelectedAmenityIds.Contains(a.Id)).ToListAsync();
            await context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        
        // Recarregar amenities em caso de erro
        var amenities = await context.Amenities.ToListAsync();
        viewModel.Amenities = amenities.Select(a => new AmenityCheckboxItem
        {
            Id = a.Id,
            Name = a.Name,
            Checked = viewModel.SelectedAmenityIds.Contains(a.Id)
        }).ToList();
        return View(viewModel);
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
            return NotFound();

        var hotel = await context.Hotels
            .FirstOrDefaultAsync(m => m.Id == id);
        
        if (hotel == null)
            return NotFound();
    
        return View(hotel);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var hotel = await context.Hotels.FindAsync(id);
        
        if (hotel != null)
            context.Hotels.Remove(hotel);
        
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            ModelState.AddModelError(string.Empty, "Não foi possível excluir o hotel. Ele pode estar associado a outras entidades.");
            return View(hotel);
        }
        catch (Exception e)
        {
            ModelState.AddModelError(string.Empty, "Erro ao excluir o pacote: " + e.Message);
            return View(hotel);
        }
        
        return RedirectToAction(nameof(Index));
    }

    private bool HotelExists(int id)
        => context.Hotels.Any(e => e.Id == id);
}