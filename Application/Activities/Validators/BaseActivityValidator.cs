using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("The title is required.")
            .MaximumLength(100).WithMessage("The title cannot exceed 100 characters.");
        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("The description is required.");
        RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("The date must be in the future.");
        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("The category is required.");
        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("The city is required.");
        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("The venue is required.");
        RuleFor(x => selector(x).Latitude)
            .NotEmpty().WithMessage("The latitude is required.")
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.");
        RuleFor(x => selector(x).Longitude)
            .NotEmpty().WithMessage("The longitude is required.")
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.");
    }

}
