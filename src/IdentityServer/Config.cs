// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer.Utils;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace IdentityServer
{
    public class Config
    {
        // TODO: Note that identity resources and access token resources
        // are configured separately.


        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            var userProfile = new IdentityResource
            {
                Name = "profile.user",
                DisplayName = "User profile",
                UserClaims = new[] { "name" }
            };
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
                userProfile
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("chatapi", "Chat API"),
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            const string baseUrl = "http://localhost:3000";
            
            return new List<Client>
            {

                new Client
                {
                    ClientId = "js.implicit",
                    ClientName = "JavaScript Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris =
                    {
                        // this where the word "implicit" in "implicit flow"
                        // comes from---we are implicitly telling the 
                        // server that we own the domain that hosts
                        // the callback page.  The server knows the domain is valid
                        // because the domain is whitelisted in the Client configuration.
                        UrlUtils.UrlCombine(baseUrl, "/callback")
                    },
                    PostLogoutRedirectUris =
                    {
                        baseUrl
                    },
                    AllowedCorsOrigins =
                    {
                        baseUrl
                    },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "chatapi"
                    },
                    RequireConsent = false, // we don't want the "Consent" Screen
                    AllowRememberConsent = false, 
                    AlwaysSendClientClaims = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AccessTokenType = AccessTokenType.Jwt,
                   // UpdateAccessTokenClaimsOnRefresh = 
                }

            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Alice"),
                        new Claim("website", "https://alice.com")
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Bob"),
                        new Claim("website", "https://bob.com")
                    }
                }
            };
        }
    }
}