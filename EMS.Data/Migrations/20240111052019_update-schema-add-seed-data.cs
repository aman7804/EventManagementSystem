using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateschemaaddseeddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Package");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Catering",
                newName: "PricePerPlate");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Venue",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Photography",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<int>(
                name: "VenueId",
                table: "Package",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Package",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "PackageEntityId",
                table: "Package",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Decoration",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "City",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Catering",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.InsertData(
                table: "Catering",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "Description", "IsActive", "Name", "PricePerPlate", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3935), 1, "15 Items: (2 soups, 3 salad, 2 sweets, 2 sabji, 2 farsan, 2 types of roti, dal, rice)", true, "Jalram Catering - Gold (15 Items)", 500m, null, null });

            migrationBuilder.InsertData(
                table: "Decoration",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "Description", "IsActive", "Name", "Price", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3962), 1, "Balloon Gate, Cake, Floor, Stage, Welcome Statue", true, "Anand Decoration - Gold", 5000m, null, null });

            migrationBuilder.InsertData(
                table: "Photography",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "Description", "IsActive", "Name", "Price", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3987), 1, "20 page album (Karzima), 60 minutes 4K, 10 mins Drone Shot", true, "Chandresh - Wedding Gold", 35000m, null, null });

            migrationBuilder.InsertData(
                table: "State",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "Name", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3843), 1, "Gujarat", null, null });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "EmailId", "FirstName", "LastName", "MobileNo", "Password", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3707), 0, "nms.nt1986@gmail.com", "Nimesh", "Parmar", "9898989898", "xyz", null, null });

            migrationBuilder.InsertData(
                table: "City",
                columns: new[] { "Id", "CreateDate", "CreatedBy", "Name", "StateId", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3870), 1, "Ahmedabad", 1, null, null });

            migrationBuilder.InsertData(
                table: "Venue",
                columns: new[] { "Id", "Address", "CityId", "CreateDate", "CreatedBy", "Description", "IsActive", "MaxCapacity", "MinCapacity", "Name", "Price", "UpdateDate", "UpdatedBy" },
                values: new object[] { 1, "Bapunagar, Ahmedabad", 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3901), 1, "Nothing", true, 500, 300, "Anand Vadi (500 Capacity)", 2500m, null, null });

            migrationBuilder.InsertData(
                table: "Package",
                columns: new[] { "Id", "CateringId", "CreateDate", "CreatedBy", "DecorationId", "IsActive", "IsDraft", "Name", "PackageEntityId", "PhotographyId", "UpdateDate", "UpdatedBy", "VenueId" },
                values: new object[] { 1, 1, new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(4012), 1, null, true, false, "Anand Vadi - Gold Package", null, 1, null, null, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Package_PackageEntityId",
                table: "Package",
                column: "PackageEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Package_Package_PackageEntityId",
                table: "Package",
                column: "PackageEntityId",
                principalTable: "Package",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Package_Package_PackageEntityId",
                table: "Package");

            migrationBuilder.DropIndex(
                name: "IX_Package_PackageEntityId",
                table: "Package");

            migrationBuilder.DeleteData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "PackageEntityId",
                table: "Package");

            migrationBuilder.RenameColumn(
                name: "PricePerPlate",
                table: "Catering",
                newName: "Price");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Venue",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Photography",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "VenueId",
                table: "Package",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Package",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Package",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Decoration",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "City",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Catering",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);
        }
    }
}
