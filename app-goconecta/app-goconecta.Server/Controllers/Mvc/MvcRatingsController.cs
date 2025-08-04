using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using app_goconecta.Server.Data;

namespace app_goconecta.Server.Controllers.Mvc
{
    public class MvcRatingsController(AppDbContext context) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var appDbContext = context.Ratings.Include(r => r.Package).Include(r => r.User);
            return View(await appDbContext.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rating = await context.Ratings
                .Include(r => r.Package)
                .Include(r => r.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }
        
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rating = await context.Ratings
                .Include(r => r.Package)
                .Include(r => r.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var rating = await context.Ratings.FindAsync(id);
            if (rating != null)
            {
                context.Ratings.Remove(rating);
            }

            await context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RatingExists(int id)
        {
            return context.Ratings.Any(e => e.Id == id);
        }
    }
}
