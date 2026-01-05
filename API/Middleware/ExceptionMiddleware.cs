using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

// IHostEnvironment gives us access to the environment variables
public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    : IMiddleware
{
    // context gives us access to the HTTP request and response
    // next is the next middleware in the pipeline
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            // pass the context to the next middleware in the pipeline
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {

            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);
        // Write the AppException object to the response as JSON
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);
        // Write the JSON string to the response body
        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    // If the property name already exists in the dictionary, add the error message to the existing list
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    // If the property name does not exist in the dictionary, add it with the error message
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }
        // Set the response status code to 400 Bad Request
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        // Create a ValidationProblemDetails object to format the validation errors
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "One or more validation errors occurred.",
            Detail = "See the errors property for details."
        };
        // Write the ValidationProblemDetails object to the response as JSON
        await context.Response.WriteAsJsonAsync(validationProblemDetails);

    }
}
