using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

// Will contain the logic to get the list of activities from the database
public class GetActivityList
{
    // Using MediatR to define a query that returns a list of Activity objects
    // This is the query that will contain the query parameters
    public class Query : IRequest<List<Activity>>
    {

    }

    // Handler class to process the Query
    //  The handler will handle and return the request that matches the Query response type List<Activity>
    public class Handler(AppDbContext context): IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {            
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
