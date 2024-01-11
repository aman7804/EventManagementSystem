using Microsoft.EntityFrameworkCore;
using EMS.Entity;

namespace EMS.Data
{
    internal static class Seed
    {
        public static void InsertDefaultData(ModelBuilder modelBuilder)
        {
            UserEntity defaultUser = new()
            {
                Id = 1,
                FirstName = "Nimesh",
                LastName = "Parmar",
                EmailId = "nms.nt1986@gmail.com",
                MobileNo = "9898989898",
                Password = "xyz",
                CreatedBy = 0,
                CreateDate = DateTime.Now,
            };
            modelBuilder.Entity<UserEntity>().HasData(defaultUser);

            StateEntity defaultState = new()
            {
                Id = 1,
                Name = "Gujarat",
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<StateEntity>().HasData(defaultState);

            CityEntity defaultCity = new()
            {
                Id = 1,
                Name = "Ahmedabad",
                StateId = defaultState.Id,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<CityEntity>().HasData(defaultCity);

            VenueEntity defaultVenue = new()
            {
                Id = 1,
                Name = "Anand Vadi (500 Capacity)",
                Description = "Nothing",
                Address = "Bapunagar, Ahmedabad",
                CityId = defaultCity.Id,
                IsActive = true,
                MaxCapacity = 500,
                MinCapacity = 300,
                Price = 2500,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<VenueEntity>().HasData(defaultVenue);

            CateringEntity defaultCatering = new()
            {
                Id = 1,
                Name = "Jalram Catering - Gold (15 Items)",
                Description = "15 Items: (2 soups, 3 salad, 2 sweets, 2 sabji, 2 farsan, 2 types of roti, dal, rice)",                
                IsActive = true,                
                PricePerPlate = 500,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<CateringEntity>().HasData(defaultCatering);

            DecorationEntity defaultDecoratio = new()
            {
                Id = 1,
                Name = "Anand Decoration - Gold",
                Description = "Balloon Gate, Cake, Floor, Stage, Welcome Statue",
                IsActive = true,
                Price = 5000,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<DecorationEntity>().HasData(defaultDecoratio);

            PhotographyEntity defaultPhotography = new()
            {
                Id = 1,
                Name = "Chandresh - Wedding Gold",
                Description = "20 page album (Karzima), 60 minutes 4K, 10 mins Drone Shot",
                IsActive = true,
                Price = 35000,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<PhotographyEntity>().HasData(defaultPhotography);

            PackageEntity defaultPackage = new()
            {   
                Id = 1,
                Name = "Anand Vadi - Gold Package",
                IsActive = true,
                CateringId = defaultCatering.Id,
                VenueId = defaultVenue.Id,
                PhotographyId = defaultPhotography.Id,
                CreatedBy = defaultUser.Id,
                CreateDate = DateTime.Now
            };
            modelBuilder.Entity<PackageEntity>().HasData(defaultPackage);

        }
    }
}