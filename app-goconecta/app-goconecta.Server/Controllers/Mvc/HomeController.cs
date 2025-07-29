using Microsoft.AspNetCore.Mvc;

namespace app_goconecta.Server.Controllers.Mvc;

public class HomeController : Controller
{
    // GET: HomeController
    public ActionResult Index()
    {
        return View();
    }

}