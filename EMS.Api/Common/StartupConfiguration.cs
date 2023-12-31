﻿using EMS.Data;
using EMS.Repository.UserModule;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EMS.Api.Common
{
    public static class StartupConfiguration
    {
        public static void ConnectDatabase(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<SqlDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("Default"));
            });
        }

        public static void AddJWTAuthentication(this IServiceCollection services, IConfiguration config)
        {
            string? jwt_secret = config?.GetSection("Jwt")?.GetSection("Secret")?.Value?.ToString() ?? string.Empty;
            var key = Encoding.ASCII.GetBytes(jwt_secret);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
        }

        public static void RegisterRepository(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();
        }

    }
}
