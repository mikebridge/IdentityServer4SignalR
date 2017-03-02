using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Test;

namespace IdentityServer.Services
{
    public class TestUserService : ILocalUserService
    {
        private readonly IDictionary<Guid, LocalUser> _users = new Dictionary<Guid, LocalUser>();

        public TestUserService()
        {
            InitTestData();
        }

        public Task<LocalUser> FindAsync(Guid id)
        {
            return Task.FromResult(_users.ContainsKey(id) ? _users[id] : null);
        }


        private void InitTestData()
        {
            var id1 = Guid.NewGuid();
            _users.Add(id1, new LocalUser
            {
                EmailAddress = "lou@example.org",
                FamilyName = "Costello",
                GivenName = "Lou",
                UserName = "lou",
                Id= id1,
                Password = "password"
            });
            var id2 = Guid.NewGuid();
            _users.Add(id2, new LocalUser
            {
                EmailAddress = "bud@example.org",
                FamilyName = "Abbott",
                GivenName = "Bud",
                UserName = "bud",
                Id = id2,
                Password = "password"
            });

        }

        public Task<LocalUser> FindByLoginCrentialsAsync(string userName, string password)
        {
            return Task.FromResult(_users.Values.FirstOrDefault(user => user.UserName == userName && user.Password == password));
        }
    }
}
