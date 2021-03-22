using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Studios",
                table: "Studios");

            migrationBuilder.RenameTable(
                name: "Studios",
                newName: "Producent");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Producent",
                table: "Producent",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Producent",
                table: "Producent");

            migrationBuilder.RenameTable(
                name: "Producent",
                newName: "Studios");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Studios",
                table: "Studios",
                column: "ID");
        }
    }
}
