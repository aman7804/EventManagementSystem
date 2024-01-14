using System;
using EMS.Shared;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class userentityrolefieldaddition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "User",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "User",
                type: "int",
                nullable: true,
                defaultValue: EnumRole.Customer);

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1764));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1723));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1780));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1809));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1794));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1697));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "CityId", "CreateDate", "Role" },
                values: new object[] { "string", 1, new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1352), 0 });

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 12, 17, 17, 12, 490, DateTimeKind.Local).AddTicks(1745));

            migrationBuilder.CreateIndex(
                name: "IX_User_CityId",
                table: "User",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_City_CityId",
                table: "User",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_City_CityId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_CityId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3935));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3870));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3962));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(4012));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3987));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3843));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3707));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 11, 10, 50, 19, 144, DateTimeKind.Local).AddTicks(3901));
        }
    }
}
