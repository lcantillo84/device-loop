using backend.Models;
using backend.Services;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ Bind your UPS settings from appsettings.json
builder.Services.Configure<UpsSettings>(
    builder.Configuration.GetSection("UPS"));

// 2️⃣ Register UpsShippingService with a named/configured HttpClient
builder.Services.AddHttpClient<UpsShippingService>(client =>
{
    // Read the BaseUrl from configuration
    var upsBase = builder.Configuration["UPS:BaseUrl"]!;
    client.BaseAddress = new Uri(upsBase);

    // Tell UPS we want/return JSON
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

// 3️⃣ Register your service for DI
builder.Services.AddScoped<UpsShippingService>();

// 4️⃣ MVC + Swagger as before
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();