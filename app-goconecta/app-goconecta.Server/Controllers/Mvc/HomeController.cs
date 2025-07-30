using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace app_goconecta.Server.Controllers.Mvc;

[Authorize (Policy="RequireAdmin")]
public class HomeController : Controller
{
    [HttpGet]
    public ActionResult Index()
    {
        return View();
    }

}