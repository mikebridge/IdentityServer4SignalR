using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Services
{
    public class LocalUser
    {
        public Guid Id { get; set; }

        public String UserName { get; set; }

        public String GivenName { get; set; }

        public String FamilyName { get; set; }

        public String FullName => $"{GivenName ?? ""} {FamilyName ?? ""}".Trim();

        public String EmailAddress { get; set; }

        // obviously in a production system we wouldn't store this in plain text!
        public String Password { get; set; }

    }
}
