using backend.Models;
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Get connection string - Railway's DATABASE_URL takes priority
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

// Add services
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
        
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();
        Console.WriteLine("Database created/verified");
        
        // Check if data exists
        var deviceCount = await context.Devices.CountAsync();
        Console.WriteLine($"Current device count: {deviceCount}");
        
        // Only seed if there's no data yet
        if (deviceCount == 0)
        {
            Console.WriteLine("No devices found, attempting to seed...");
            Console.WriteLine("Looking for Data/test.json file...");
            
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
        Console.WriteLine($"Database initialization error: {ex.Message}");
        // Continue running even if seeding fails
    }
}

// Configure the HTTP request pipeline
app.UseCors("AllowReactApp");

// Enable Swagger in all environments
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
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
var url = Environment.GetEnvironmentVariable("RAILWAY_ENVIRONMENT") != null 
    ? $"http://0.0.0.0:{port}"
    : $"http://localhost:{port}";

Console.WriteLine($"Starting server on: {url}");
Console.WriteLine($"Swagger available at: {url}/swagger");

app.Run(url);