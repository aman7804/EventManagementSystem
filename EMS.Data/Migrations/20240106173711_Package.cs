using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class Package : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    VenueId = table.Column<int>(type: "int", nullable: true),
                    PhotographyId = table.Column<int>(type: "int", nullable: true),
                    DecorationId = table.Column<int>(type: "int", nullable: true),
                    CateringId = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Package_Catering_CateringId",
                        column: x => x.CateringId,
                        principalTable: "Catering",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Package_Decoration_DecorationId",
                        column: x => x.DecorationId,
                        principalTable: "Decoration",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Package_Photography_PhotographyId",
                        column: x => x.PhotographyId,
                        principalTable: "Photography",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Package_Venue_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venue",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Package_CateringId",
                table: "Package",
                column: "CateringId");

            migrationBuilder.CreateIndex(
                name: "IX_Package_DecorationId",
                table: "Package",
                column: "DecorationId");

            migrationBuilder.CreateIndex(
                name: "IX_Package_Name",
                table: "Package",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Package_PhotographyId",
                table: "Package",
                column: "PhotographyId");

            migrationBuilder.CreateIndex(
                name: "IX_Package_VenueId",
                table: "Package",
                column: "VenueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Package");
        }
    }
}
