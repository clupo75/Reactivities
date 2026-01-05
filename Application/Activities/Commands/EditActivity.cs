using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // get the activity from the database by its id
            var activity = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            // update the activity properties using AutoMapper, which maps the properties 
            // from the request.ActivityDto to the existing activity entity
            mapper.Map(request.ActivityDto, activity);
            
            // save the changes to the database and check if the database was updated
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            // return success or failure result using the Result class
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update activity", 400);
        }
    }
}
