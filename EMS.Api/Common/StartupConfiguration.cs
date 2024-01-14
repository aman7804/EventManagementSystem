﻿using EMS.Api.Authorization;
using EMS.Data;
using EMS.Repository.BookingModule;
using EMS.Repository.CateringModule;
using EMS.Repository.CitytModule;
using EMS.Repository.DecorationModule;
using EMS.Repository.PackageModule;
using EMS.Repository.PhotographyModule;
using EMS.Repository.StateModule;
using EMS.Repository.UserModule;
using EMS.Repository.VenueModule;
using EMS.Service.BookingModule;
using EMS.Service.CateringModule;
using EMS.Service.CityModule;
using EMS.Service.DecorationModule;
using EMS.Service.PackageModule;
using EMS.Service.PhotographyModule;
using EMS.Service.StateModule;
using EMS.Service.UserModule;
using EMS.Service.VenueModule;
using Microsoft.EntityFrameworkCore;

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

        public static void RegisterRepository(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IStateRepository, StateRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IVenueRepository, VenueRepository>();
            services.AddScoped<IDecorationRepository, DecorationRepository>();
            services.AddScoped<ICateringRepository, CateringRepository>();
            services.AddScoped<IPhotographyRepository, PhotographyRepository>();
            services.AddScoped<IPackageRepository, PackageRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
        }

        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IStateService, StateService>();
            services.AddTransient<ICityService, CityService>();
            services.AddTransient<IVenueService, VenueService>();
            services.AddTransient<IDecorationService, DecorationService>();
            services.AddTransient<ICateringService, CateringService>();
            services.AddTransient<IPhotographyService, PhotographyService>();
            services.AddTransient<IPackageService, PackageService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IJwtUtils, JwtUtils>();
        }

    }
}
