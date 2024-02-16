using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class user_email_unique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(2886));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 2, 16, 16, 54, 0, 985, DateTimeKind.Local).AddTicks(3193));

            migrationBuilder.CreateIndex(
                name: "IX_User_EmailId",
                table: "User",
                column: "EmailId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_EmailId",
                table: "User");

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(625));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(587));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(645));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(675));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(660));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(563));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(349));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 1, 16, 16, 1, 7, 130, DateTimeKind.Local).AddTicks(607));
        }
    }
}
