using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // setting up a property for MediatR to be used in derived controllers
        private IMediator? _mediator;
        // A protected property is one that can be accessed by this class and any class that derives from it.
        // The ??= operator means "if _mediator is null, assign it the value on the right".
        // So if the _mediator field is null, it will get the IMediator service from the HttpContext's RequestServices.
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service not found");

        protected ActionResult HandleResult<T>(Result<T> result)
        {

            if (!result.IsSuccess && result.Code == 404)
                return NotFound();
            if (result.IsSuccess && result.Value is not null)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
    }
}
