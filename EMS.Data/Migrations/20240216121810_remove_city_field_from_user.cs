using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class remove_city_field_from_user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_City_CityId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_CityId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "User");

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3920));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3876));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3940));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3977));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3957));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3851));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3583));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 17, 48, 9, 227, DateTimeKind.Local).AddTicks(3902));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3220));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3111));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3238));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3273));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3255));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3090));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CityId", "CreateDate" },
                values: new object[] { 1, new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(2886) });

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3193));

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
    }
}
