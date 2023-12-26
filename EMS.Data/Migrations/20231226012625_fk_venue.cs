using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class fk_venue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Venue_CityId",
                table: "Venue",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Venue_StateId",
                table: "Venue",
                column: "StateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Venue_City_CityId",
                table: "Venue",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Venue_State_StateId",
                table: "Venue",
                column: "StateId",
                principalTable: "State",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venue_City_CityId",
                table: "Venue");

            migrationBuilder.DropForeignKey(
                name: "FK_Venue_State_StateId",
                table: "Venue");

            migrationBuilder.DropIndex(
                name: "IX_Venue_CityId",
                table: "Venue");

            migrationBuilder.DropIndex(
                name: "IX_Venue_StateId",
                table: "Venue");
        }
    }
}
