using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoIgre_Klub_KlubID",
                table: "VideoIgre");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VideoIgre",
                table: "VideoIgre");

            migrationBuilder.RenameTable(
                name: "VideoIgre",
                newName: "Film");

            migrationBuilder.RenameIndex(
                name: "IX_VideoIgre_KlubID",
                table: "Film",
                newName: "IX_Film_KlubID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Film",
                table: "Film",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Film_Klub_KlubID",
                table: "Film",
                column: "KlubID",
                principalTable: "Klub",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Film_Klub_KlubID",
                table: "Film");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Film",
                table: "Film");

            migrationBuilder.RenameTable(
                name: "Film",
                newName: "VideoIgre");

            migrationBuilder.RenameIndex(
                name: "IX_Film_KlubID",
                table: "VideoIgre",
                newName: "IX_VideoIgre_KlubID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VideoIgre",
                table: "VideoIgre",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoIgre_Klub_KlubID",
                table: "VideoIgre",
                column: "KlubID",
                principalTable: "Klub",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
