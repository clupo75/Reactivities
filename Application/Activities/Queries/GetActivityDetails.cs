using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        // The Id of the activity to retrieve details for
        public required string Id { get; set; }
    }

    // The Handler will inject the AppDbContext to access the database and use the IRequestHandler interface
    // to handle the Query and return an Activity object
    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        // This is the handler interface method that will be called to process the Query
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            // use the context to find the activity by Id
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

            // Return the activity or a failure result if not found using the Result<T> wrapper
            if (activity == null) return Result<Activity>.Failure("Activity not found", 404);
            
            return Result<Activity>.Success(activity);
        }
    }
}
