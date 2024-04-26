﻿// <auto-generated />
using System;
using EMS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EMS.Data.Migrations
{
    [DbContext(typeof(SqlDbContext))]
    [Migration("20240112114713_user-entity-role-field-addition")]
    partial class userentityrolefieldaddition
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EMS.Entity.BookingEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("DueAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("MaxGuest")
                        .HasColumnType("int");

                    b.Property<int>("MinGuest")
                        .HasColumnType("int");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("Booking");
                });

            modelBuilder.Entity("EMS.Entity.CateringEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("PricePerPlate")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Catering");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1764),
                            CreatedBy = 1,
                            Description = "15 Items: (2 soups, 3 salad, 2 sweets, 2 sabji, 2 farsan, 2 types of roti, dal, rice)",
                            IsActive = true,
                            Name = "Jalram Catering - Gold (15 Items)",
                            PricePerPlate = 500m
                        });
                });

            modelBuilder.Entity("EMS.Entity.CityEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("StateId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("StateId");

                    b.ToTable("City");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1723),
                            CreatedBy = 1,
                            Name = "Ahmedabad",
                            StateId = 1
                        });
                });

            modelBuilder.Entity("EMS.Entity.DecorationEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Decoration");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1780),
                            CreatedBy = 1,
                            Description = "Balloon Gate, Cake, Floor, Stage, Welcome Statue",
                            IsActive = true,
                            Name = "Anand Decoration - Gold",
                            Price = 5000m
                        });
                });

            modelBuilder.Entity("EMS.Entity.PackageEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CateringId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<int?>("DecorationId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDraft")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("PackageEntityId")
                        .HasColumnType("int");

                    b.Property<int?>("PhotographyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.Property<int>("VenueId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CateringId");

                    b.HasIndex("DecorationId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("PackageEntityId");

                    b.HasIndex("PhotographyId");

                    b.HasIndex("VenueId");

                    b.ToTable("Package");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CateringId = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1809),
                            CreatedBy = 1,
                            IsActive = true,
                            IsDraft = false,
                            Name = "Anand Vadi - Gold Package",
                            PhotographyId = 1,
                            VenueId = 1
                        });
                });

            modelBuilder.Entity("EMS.Entity.PhotographyEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Photography");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1794),
                            CreatedBy = 1,
                            Description = "20 page album (Karzima), 60 minutes 4K, 10 mins Drone Shot",
                            IsActive = true,
                            Name = "Chandresh - Wedding Gold",
                            Price = 35000m
                        });
                });

            modelBuilder.Entity("EMS.Entity.StateEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("State");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1697),
                            CreatedBy = 1,
                            Name = "Gujarat"
                        });
                });

            modelBuilder.Entity("EMS.Entity.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("EmailId")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MobileNo")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("nvarchar(16)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "string",
                            CityId = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1352),
                            CreatedBy = 0,
                            EmailId = "nms.nt1986@gmail.com",
                            FirstName = "Nimesh",
                            LastName = "Parmar",
                            MobileNo = "9898989898",
                            Password = "xyz",
                            Role = 0
                        });
                });

            modelBuilder.Entity("EMS.Entity.VenueEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("MaxCapacity")
                        .HasColumnType("int");

                    b.Property<int>("MinCapacity")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Venue");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Bapunagar, Ahmedabad",
                            CityId = 1,
                            CreateDate = new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1745),
                            CreatedBy = 1,
                            Description = "Nothing",
                            IsActive = true,
                            MaxCapacity = 500,
                            MinCapacity = 300,
                            Name = "Anand Vadi (500 Capacity)",
                            Price = 2500m
                        });
                });

            modelBuilder.Entity("EMS.Entity.BookingEntity", b =>
                {
                    b.HasOne("EMS.Entity.PackageEntity", "Package")
                        .WithMany()
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("EMS.Entity.CityEntity", b =>
                {
                    b.HasOne("EMS.Entity.StateEntity", "State")
                        .WithMany("Cities")
                        .HasForeignKey("StateId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("State");
                });

            modelBuilder.Entity("EMS.Entity.PackageEntity", b =>
                {
                    b.HasOne("EMS.Entity.CateringEntity", "Catering")
                        .WithMany()
                        .HasForeignKey("CateringId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("EMS.Entity.DecorationEntity", "Decoration")
                        .WithMany("Packages")
                        .HasForeignKey("DecorationId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("EMS.Entity.PackageEntity", null)
                        .WithMany("Packages")
                        .HasForeignKey("PackageEntityId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("EMS.Entity.PhotographyEntity", "Photography")
                        .WithMany("Packages")
                        .HasForeignKey("PhotographyId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("EMS.Entity.VenueEntity", "Venue")
                        .WithMany("Packages")
                        .HasForeignKey("VenueId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Catering");

                    b.Navigation("Decoration");

                    b.Navigation("Photography");

                    b.Navigation("Venue");
                });

            modelBuilder.Entity("EMS.Entity.UserEntity", b =>
                {
                    b.HasOne("EMS.Entity.CityEntity", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("EMS.Entity.VenueEntity", b =>
                {
                    b.HasOne("EMS.Entity.CityEntity", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("EMS.Entity.DecorationEntity", b =>
                {
                    b.Navigation("Packages");
                });

            modelBuilder.Entity("EMS.Entity.PackageEntity", b =>
                {
                    b.Navigation("Packages");
                });

            modelBuilder.Entity("EMS.Entity.PhotographyEntity", b =>
                {
                    b.Navigation("Packages");
                });

            modelBuilder.Entity("EMS.Entity.StateEntity", b =>
                {
                    b.Navigation("Cities");
                });

            modelBuilder.Entity("EMS.Entity.VenueEntity", b =>
                {
                    b.Navigation("Packages");
                });
#pragma warning restore 612, 618
        }
    }
}
