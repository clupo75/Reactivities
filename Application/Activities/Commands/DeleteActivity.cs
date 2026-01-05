using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // find the activity by id in the database
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            // track the entity for deletion in memory
            context.Activities.Remove(activity);
            // persist the deletion to the database and check if successful by 
            // verifying affected entries is greater than 0
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            // return success or failure result usiing the Result class
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to delete activity", 400);
        }
    }
}
