using WebApi.Authorization; 
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EMS.Api.Controllers
{
    [Authorize]
    public class TestController : ControllerBase
    {
        [HttpGet("test")]
        public IActionResult Test()
        {
            // Access user information through the User property
            var userId = User.FindFirst(ClaimTypes.Name)?.Value;
            return Ok($"Authenticated user with ID: {userId} accessed the test endpoint.");
        }
    }

}
