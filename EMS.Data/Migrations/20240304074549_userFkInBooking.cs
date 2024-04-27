using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class userFkInBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2979));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2925));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2996));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(3046));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(3025));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2890));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2593));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 4, 13, 15, 48, 759, DateTimeKind.Local).AddTicks(2956));

            migrationBuilder.CreateIndex(
                name: "IX_Booking_CustomerId",
                table: "Booking",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_User_CustomerId",
                table: "Booking",
                column: "CustomerId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_User_CustomerId",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_CustomerId",
                table: "Booking");

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
    }
}
