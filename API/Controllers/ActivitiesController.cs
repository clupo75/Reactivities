using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// derived class from BaseApiController
// The controller just forwards the requests to the application layer.
public class ActivitiesController : BaseApiController
{
    // GET: api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // use MediatR to send the GetActivityList query and return the list of activities
        // The Mediator property is inherited from BaseApiController
        return await Mediator.Send(new GetActivityList.Query());

    }

    // GET: api/activities/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // find activity by id in the database using MediatR
        // The Mediator property is inherited from BaseApiController
        return await Mediator.Send(new GetActivityDetails.Query { Id = id });
    }

    // POST: api/activities
    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        // use MediatR to send the CreateActivity command to create a new activity
        // by passing the activity object received from the request body
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    // PUT: api/activities
    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        // use MediatR to send the EditActivity command to update the activity
        await Mediator.Send(new EditActivity.Command { Activity = activity });
        return NoContent();
    }

    // DELETE: api/activities/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        // use MediatR to send the DeleteActivity command to delete the activity by id
        await Mediator.Send(new DeleteActivity.Command { Id = id });

        return Ok();
    }

}
