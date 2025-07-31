using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;
using app_goconecta.Server.Models;
using app_goconecta.Server.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class MvcHotelsController : Controller
{
    private readonly AppDbContext _context;

    public MvcHotelsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: Hotels
    public async Task<IActionResult> Index()
    {
        return View(await _context.Hotels.ToListAsync());
    }

    // GET: Hotels/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var hotel = await _context.Hotels
            .FirstOrDefaultAsync(m => m.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        return View(hotel);
    }

    // GET: Hotels/Create
    public async Task<IActionResult> Create()
    {
        var amenities = await _context.Amenities.ToListAsync();
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

    // POST: Hotels/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(HotelEditViewModel viewModel)
    {
        if (ModelState.IsValid)
        {
            var hotel = new Hotel
            {
                Name = viewModel.Name,
                Description = viewModel.Description,
                Rating = viewModel.Rating,
                RoomsAvailable = viewModel.RoomsAvailable,
                Region = viewModel.Region,
                Address = viewModel.Address,
                Amenities = await _context.Amenities.Where(a => viewModel.SelectedAmenityIds.Contains(a.Id)).ToListAsync()
            };
            _context.Add(hotel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        // Recarregar amenities em caso de erro
        var amenities = await _context.Amenities.ToListAsync();
        viewModel.Amenities = amenities.Select(a => new AmenityCheckboxItem
        {
            Id = a.Id,
            Name = a.Name,
            Checked = viewModel.SelectedAmenityIds.Contains(a.Id)
        }).ToList();
        return View(viewModel);
    }

    // GET: Hotels/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }
        var hotel = await _context.Hotels.Include(h => h.Amenities).FirstOrDefaultAsync(h => h.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }
        var amenities = await _context.Amenities.ToListAsync();
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

    // POST: Hotels/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, HotelEditViewModel viewModel)
    {
        if (id != viewModel.Id)
        {
            return NotFound();
        }
        if (ModelState.IsValid)
        {
            var hotel = await _context.Hotels.Include(h => h.Amenities).FirstOrDefaultAsync(h => h.Id == id);
            if (hotel == null)
            {
                return NotFound();
            }
            hotel.Name = viewModel.Name;
            hotel.Description = viewModel.Description;
            hotel.Rating = viewModel.Rating;
            hotel.RoomsAvailable = viewModel.RoomsAvailable;
            hotel.Region = viewModel.Region;
            hotel.Address = viewModel.Address;
            // Atualizar amenities
            hotel.Amenities = await _context.Amenities.Where(a => viewModel.SelectedAmenityIds.Contains(a.Id)).ToListAsync();
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        // Recarregar amenities em caso de erro
        var amenities = await _context.Amenities.ToListAsync();
        viewModel.Amenities = amenities.Select(a => new AmenityCheckboxItem
        {
            Id = a.Id,
            Name = a.Name,
            Checked = viewModel.SelectedAmenityIds.Contains(a.Id)
        }).ToList();
        return View(viewModel);
    }

    // GET: Hotels/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var hotel = await _context.Hotels
            .FirstOrDefaultAsync(m => m.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        return View(hotel);
    }

    // POST: Hotels/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var hotel = await _context.Hotels.FindAsync(id);
        if (hotel != null)
        {
            _context.Hotels.Remove(hotel);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool HotelExists(int id)
    {
        return _context.Hotels.Any(e => e.Id == id);
    }
}