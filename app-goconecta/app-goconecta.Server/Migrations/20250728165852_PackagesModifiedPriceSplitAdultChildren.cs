using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app_goconecta.Server.Migrations
{
    /// <inheritdoc />
    public partial class PackagesModifiedPriceSplitAdultChildren : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Packages",
                newName: "PriceChildren");

            migrationBuilder.AddColumn<int>(
                name: "NumOfAdults",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumOfChildren",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceAdults",
                table: "Packages",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumOfAdults",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "NumOfChildren",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PriceAdults",
                table: "Packages");

            migrationBuilder.RenameColumn(
                name: "PriceChildren",
                table: "Packages",
                newName: "Price");
        }
    }
}
