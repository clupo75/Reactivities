using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add CORS policy to allow requests from specific domains
// This adds a header to the http response that tells the 
// browser to allow requests from other domains
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline. Middleware functions
// are executed in the order they are added here.
app.UseCors(options => options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000")
); // Enable CORS for the application

app.MapControllers();

// Create a scope to get services
// Anything used here will be disposed of when we exit the scope, because of the using keyword.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

// Seed the data into the database
try
{
    // get the AppDbContext service from the service provider
    // This will allow us to query our database
    var context = services.GetRequiredService<AppDbContext>();
    // create the database if it doesn't exist and apply any pending migrations
    await context.Database.MigrateAsync();
    // call the SeedData method to seed the database
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{

    // log any exceptions that occur during seeding
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
