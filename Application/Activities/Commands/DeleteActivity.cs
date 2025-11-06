using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // find the activity by id in the database
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Activity not found");

            // track the entity for deletion in memory
            context.Activities.Remove(activity);
            // persist the deletion to the database
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
