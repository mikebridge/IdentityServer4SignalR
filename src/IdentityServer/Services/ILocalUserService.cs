using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Services
{
    public interface ILocalUserService
    {
        Task<LocalUser> FindAsync(Guid id);

        Task<LocalUser> FindByLoginCrentialsAsync(string userName, string password);
    }
}
