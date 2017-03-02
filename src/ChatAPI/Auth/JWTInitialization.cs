using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ChatAPI.Auth
{
    public static class JWTInitialization
    {

        public static void Initialize(IApplicationBuilder app, IConfigurationRoot configuration)
        {
            ConfigureJwtAuth(app, configuration);
        }

        private static X509Certificate2 GetCertificateFromStore(string certName)
        {

            // Get the certificate store for the current user.
            //using (X509Store store = new X509Store(StoreName.TrustedPeople, StoreLocation.CurrentUser))
            using (X509Store store = new X509Store(StoreName.TrustedPeople))
            {
                store.Open(OpenFlags.ReadOnly);

                // Place all certificates in an X509Certificate2Collection object.
                X509Certificate2Collection certCollection = store.Certificates;

                // If using a certificate with a trusted root you do not need to FindByTimeValid, instead:
                // currentCerts.Find(X509FindType.FindBySubjectDistinguishedName, certName, true);
                X509Certificate2Collection currentCerts = certCollection.Find(X509FindType.FindByTimeValid, DateTime.Now,
                    false);
                X509Certificate2Collection signingCert = currentCerts.Find(X509FindType.FindBySubjectDistinguishedName,
                    certName, false);
                if (signingCert.Count == 0)
                    return null;
                // Return the first certificate in the collection, has the right name and is current.
                return signingCert[0];
            }
        }

        private static void ConfigureJwtAuth(IApplicationBuilder app, IConfigurationRoot configuration)
        {
            var jwtAppSettingOptions = configuration.GetSection("JwtIssuerOptions");

            var selector = jwtAppSettingOptions["CertName"];
            if (selector == null)
            {
                throw new Exception("The CertName is not configured in the appsettings");
            }
            var cert = GetCertificateFromStore(selector);

            if (cert == null)
            {
                Console.Error.WriteLine("Unable to find cert for " + selector);
                throw new Exception("Unable to find cert for " + selector);
            }
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions["Issuer"],
                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions["Audience"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = new List<SecurityKey>
                {
                    new X509SecurityKey(cert)
                    // If there are multiple valid keys, configure them here,
                    // e.g. during a key migration.
                },
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            // add middleware to translate the query string token 
            // passed by SignalR into an Authorization Bearer header
            app.UseJwtSignalRAuthentication();

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });


        }

    }
}
