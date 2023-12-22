using System.Net;

namespace EMS.Api.Common
{   
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var statusCode = ex switch
                {   
                    NullReferenceException => HttpStatusCode.BadRequest,    
                     _ => HttpStatusCode.InternalServerError
                };

                string? innerExcetion = null;
                if (ex.InnerException != null)
                {
                    innerExcetion = ex.InnerException.Message;
                }

                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync($"{{\"message\": \"Internal Server Error\"," +
                                                    $"\"error\": \"{ex.Message}\"," +
                                                    $"\"innerExcetion\": \"{innerExcetion}\"}} ");
            }
        }
    }
}
