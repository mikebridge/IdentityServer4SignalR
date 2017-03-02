using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;

namespace IdentityServer.Services
{
    public class LocalProfileService : IProfileService
    {
        private readonly ILocalUserService _userService;

        public LocalProfileService(ILocalUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Side Effect: this mutates context.IssuedClaims with the user's identity properties if the
        /// user is found.  Otherwise do nothing.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            /*
             * see: https://damienbod.com/2016/11/18/extending-identity-in-identityserver4-to-manage-users-in-asp-net-core/
             * The Identity properties need to be added to the claims so that the client SPA or whatever client it 
             * is can use the properties. In IdentityServer4, the IProfileService interface is used for 
             * this. Each custom ApplicationUser property is added as claims as required.
             */
             

            var identityidString = context.Subject.GetSubjectId();
            Guid identityid;
            bool success = Guid.TryParse(identityidString, out identityid);
            if (!success)
            {
                return;
            }

            var user = await _userService.FindAsync(identityid);

            if (user == null)
            {
                return;
            }
            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.FamilyName, user.FamilyName, ClaimValueTypes.String),
                new Claim(JwtClaimTypes.GivenName, user.GivenName, ClaimValueTypes.String),
                new Claim(JwtClaimTypes.Name, user.FullName, ClaimValueTypes.String),
                new Claim(JwtClaimTypes.Id, user.Id.ToString(), ClaimValueTypes.String),
                new Claim(JwtClaimTypes.PreferredUserName, user.UserName, ClaimValueTypes.String)
            };
            // hard-code access to "chatapi.user"----normally this would come from a
            // database!
            claims.Add(new Claim(JwtClaimTypes.Role, "chatapi.user"));
            claims.Add(new Claim(JwtClaimTypes.Scope, "chatapi"));

            context.IssuedClaims = claims;
          
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            // TODO: Make this check the active status of the user
            var sub = await Task.FromResult(context.Subject.GetSubjectId());
            //var user = await _userManager.FindByIdAsync(sub);
            //context.IsActive = user != null;

            context.IsActive = true;

        }
    }

}
