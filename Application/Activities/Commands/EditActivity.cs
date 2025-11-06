using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // get the activity from the database by its id
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken)
                ?? throw new Exception("Activity not found");

            // update the activity properties using AutoMapper, which maps the properties 
            // from the request.Activity to the existing activity entity
            mapper.Map(request.Activity, activity);
            
            // save the changes to the database
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
