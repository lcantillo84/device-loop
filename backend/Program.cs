using backend.Models;
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Get connection string and convert Railway format to Entity Framework format
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

Console.WriteLine($"Raw DATABASE_URL: '{connectionString}'");

if (!string.IsNullOrEmpty(connectionString) && (connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://")))
{
    try
    {
        // Convert Railway's postgres:// or postgresql:// format to Entity Framework format
        var uri = new Uri(connectionString);
        var userInfo = uri.UserInfo.Split(':');
        connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.Substring(1)};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
        Console.WriteLine("Using Railway PostgreSQL database");
        Console.WriteLine($"Converted connection string: Host={uri.Host};Port={uri.Port};Database=***;Username={userInfo[0]};Password=***");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error converting connection string: {ex.Message}");
        connectionString = null;
    }
}

if (string.IsNullOrEmpty(connectionString))
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    Console.WriteLine("Using local PostgreSQL database");
    Console.WriteLine($"Local connection string: {connectionString}");
}

// Configure services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.Configure<UpsSettings>(
    builder.Configuration.GetSection("UPS"));

builder.Services.AddHttpClient<UpsShippingService>(client => {
    var upsBase = builder.Configuration["UPS:BaseUrl"] ?? "https://wwwcie.ups.com";
    client.BaseAddress = new Uri(upsBase);
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddScoped<UpsShippingService>();
builder.Services.AddScoped<DeviceDataSeeder>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Database initialization and seeding
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var seeder = scope.ServiceProvider.GetRequiredService<DeviceDataSeeder>();
    
    try
    {
        Console.WriteLine("Starting database initialization...");
        
        // Apply migrations (creates tables from migration files)
        await context.Database.MigrateAsync();
        Console.WriteLine("Database migrations applied successfully");
        
        // Check if data exists
        var deviceCount = await context.Devices.CountAsync();
        Console.WriteLine($"Current device count: {deviceCount}");
        
        // Only seed if there's no data yet
        if (deviceCount == 0)
        {
            Console.WriteLine("No devices found, attempting to seed...");
            
            if (File.Exists("Data/test.json"))
            {
                Console.WriteLine("JSON file found, starting seeding...");
                await seeder.SeedFromJsonAsync("Data/test.json");
                
                var newCount = await context.Devices.CountAsync();
                Console.WriteLine($"Seeding completed. New device count: {newCount}");
            }
            else
            {
                Console.WriteLine("ERROR: Data/test.json file not found!");
            }
        }
        else
        {
            Console.WriteLine("Database already has data, skipping seeding");
        }
        
        Console.WriteLine("Database initialization completed");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database error: {ex.Message}");
        // Continue running even if database setup fails
    }
}

// Configure the HTTP request pipeline
app.UseCors("AllowReactApp");

// Enable Swagger in all environments for testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend API V1");
    c.RoutePrefix = "swagger";
});

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

// Configure port for both local and Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
var url = $"http://0.0.0.0:{port}";

Console.WriteLine($"Starting server on: {url}");
Console.WriteLine($"Swagger available at: {url}/swagger");

app.Run(url);