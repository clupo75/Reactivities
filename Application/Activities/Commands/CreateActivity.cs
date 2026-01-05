using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            // maps the DTO to an Activity object
            var activity = mapper.Map<Activity>(request.ActivityDto);
            // adds the new activity to memory context
            context.Activities.Add(activity);

            // save the changes to the database and check if the database was updated
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            // return success or failure result using the Result class
            return result ? Result<string>.Success(activity.Id) : Result<string>.Failure("Failed to create activity", 400);
        }
    }
}
