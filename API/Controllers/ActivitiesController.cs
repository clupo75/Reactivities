using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// derived class from BaseApiController
// using primary constructor to inject AppDbContext for database operations
public class ActivitiesController(AppDbContext context) : BaseApiController
{
    // GET: api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();

    }

    // GET: api/activities/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // find activity by id in the database
        var activity =  await context.Activities.FindAsync(id);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }

}
