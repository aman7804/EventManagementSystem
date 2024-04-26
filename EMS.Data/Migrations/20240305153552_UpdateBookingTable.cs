using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBookingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxGuest",
                table: "Booking");

            migrationBuilder.RenameColumn(
                name: "MinGuest",
                table: "Booking",
                newName: "NumberOfGuests");

            migrationBuilder.RenameColumn(
                name: "DueAmount",
                table: "Booking",
                newName: "PaidAmount");

            migrationBuilder.UpdateData(
                table: "Catering",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4662));

            migrationBuilder.UpdateData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4624));

            migrationBuilder.UpdateData(
                table: "Decoration",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4677));

            migrationBuilder.UpdateData(
                table: "Package",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4777));

            migrationBuilder.UpdateData(
                table: "Photography",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4756));

            migrationBuilder.UpdateData(
                table: "State",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4603));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4424));

            migrationBuilder.UpdateData(
                table: "Venue",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2024, 3, 5, 21, 5, 52, 149, DateTimeKind.Local).AddTicks(4642));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaidAmount",
                table: "Booking",
                newName: "DueAmount");

            migrationBuilder.RenameColumn(
                name: "NumberOfGuests",
                table: "Booking",
                newName: "MinGuest");

            migrationBuilder.AddColumn<int>(
                name: "MaxGuest",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
        }
    }
}
