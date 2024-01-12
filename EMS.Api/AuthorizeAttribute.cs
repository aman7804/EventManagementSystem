using EMS.Entity;
using EMS.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Authorization;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly IList<EnumRole> _roles;

    public AuthorizeAttribute(params EnumRole[] roles) =>
        _roles = roles ?? new EnumRole[] { };

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // skip authorization if action is decorated with [AllowAnonymous] attribute
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
        if (allowAnonymous)
            return;

        // authorization
        var user = (UserEntity)context.HttpContext.Items["User"];
        if (user == null || (_roles.Any() && !_roles.Contains(user.Role)))
        {
            // not logged in or role not authorized
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}