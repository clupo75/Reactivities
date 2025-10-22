using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    // sets the Db for the Activity entity class
    public required DbSet<Activity> Activities { get; set; }

}
