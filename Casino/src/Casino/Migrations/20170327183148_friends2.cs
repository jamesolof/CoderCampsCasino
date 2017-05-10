using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Casino.Migrations
{
    public partial class friends2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FriendsList",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Friends",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Friends",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "FriendsList",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
