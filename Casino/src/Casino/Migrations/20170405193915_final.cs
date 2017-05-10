using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Casino.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NavBarColor",
                table: "AspNetUsers",
                nullable: true,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "BackgroundColor",
                table: "AspNetUsers",
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NavBarColor",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BackgroundColor",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
