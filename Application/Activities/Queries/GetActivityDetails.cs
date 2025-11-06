using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        // The Id of the activity to retrieve details for
        public required string Id { get; set; }
    }

    // The Hnadler will inject the AppDbContext to access the database and use the IRequestHandler interface
    // to handle the Query and return an Activity object
    public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    {
        // This is the handler interface method that will be called to process the Query
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            // use the context to find the activity by Id
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken) 
                ?? throw new Exception("Activity not found");
            return activity;
        }
    }
}
