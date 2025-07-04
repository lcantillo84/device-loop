using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Brand = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ModelName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    StorageGB = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    PriceUsd = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    LaunchedYear = table.Column<int>(type: "integer", nullable: false),
                    DaysUsed = table.Column<int>(type: "integer", nullable: false),
                    PayoutBrandNew = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    PayoutFlawless = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    PayoutVeryGood = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    PayoutGood = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    PayoutFair = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    PayoutBroken = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    TreeCostUsd = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    OverheadCostUsd = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetBrandNewPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetFlawlessPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetVeryGoodPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetGoodPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetFairPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    NetBrokenPayout = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Devices");
        }
    }
}
