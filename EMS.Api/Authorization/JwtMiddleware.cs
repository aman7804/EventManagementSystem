using EMS.Service.UserModule;
using System.Security.Claims;

namespace EMS.Api.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService _userService, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateJwtToken(token);
            if (userId != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("userId", userId.ToString()),
                };
                var identity = new ClaimsIdentity(claims, "custom");
                var principal = new ClaimsPrincipal(identity);
                context.User = principal;

                // attach user to context on successful jwt validation
                context.Items["User"] = await _userService.GetByIdAsync(userId.Value, true);
            }

            await _next(context);
        }
    }
}
