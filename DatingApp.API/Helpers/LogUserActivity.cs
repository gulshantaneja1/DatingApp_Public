using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Extensions.DependencyInjection;
using DatingApp.API.Data;
using System;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        
         
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            var userID = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await repo.GetUser(userID,true);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();

      
        }

    }
}