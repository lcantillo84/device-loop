// using backend.Models;
// using backend.Services;
// using System.Net.Http.Headers;
//
// var builder = WebApplication.CreateBuilder(args);
//
// builder.Services.Configure<UpsSettings>(
//     builder.Configuration.GetSection("UPS"));
//
// builder.Services.AddHttpClient<UpsShippingService>(client => {
//     var upsBase = builder.Configuration["UPS:BaseUrl"]!;
//     client.BaseAddress = new Uri(upsBase);
//     client.DefaultRequestHeaders.Accept.Add(
//         new MediaTypeWithQualityHeaderValue("application/json"));
// });
//
// builder.Services.AddScoped<UpsShippingService>();
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
//
// builder.Services.AddCors(options => {
//     options.AddPolicy("AllowReactApp", policy =>
//     {
//         policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
//             .AllowAnyHeader()
//             .AllowAnyMethod();
//     });
// });
//
// var app = builder.Build();
//
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
//
// app.UseCors("AllowReactApp");
// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();
//
// app.Run();
using backend.Models;
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.Configure<UpsSettings>(
    builder.Configuration.GetSection("UPS"));

builder.Services.AddHttpClient<UpsShippingService>(client => {
    var upsBase = builder.Configuration["UPS:BaseUrl"]!;
    client.BaseAddress = new Uri(upsBase);
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddScoped<UpsShippingService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed database from JSON
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.EnsureCreatedAsync();
    
    if (!await context.Devices.AnyAsync())
    {
        var json = await File.ReadAllTextAsync("Data/devices.json");
        var devices = JsonSerializer.Deserialize<List<DeviceJson>>(json);
        
        foreach (var d in devices.Take(100)) // Limit to first 100 for now
        {
            context.Devices.Add(new Device
            {
                Brand = d.brand,
                ModelName = d.ModelName,
                PriceUsd = decimal.Parse(d.price_usd),
                NetFlawlessPayout = decimal.Parse(d.net_flawless_payout),
                NetVeryGoodPayout = decimal.Parse(d.net_very_good_payout),
                NetGoodPayout = decimal.Parse(d.net_good_payout),
                NetFairPayout = decimal.Parse(d.net_fair_payout),
                NetBrokenPayout = decimal.Parse(d.net_broken_payout)
            });
        }
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {devices.Count} devices");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

public class DeviceJson
{
    public string brand { get; set; }
    public string ModelName { get; set; }
    public string price_usd { get; set; }
    public string net_flawless_payout { get; set; }
    public string net_very_good_payout { get; set; }
    public string net_good_payout { get; set; }
    public string net_fair_payout { get; set; }
    public string net_broken_payout { get; set; }
}