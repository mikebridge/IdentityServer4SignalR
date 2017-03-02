import { globalConfig } from "./env";

const authUrl = globalConfig.baseIdentityUrl;
const baseUrl = globalConfig.currentBaseUrl;

export const oidcImplicitSettings = {
    // URL of your OpenID Connect server.
    // The library uses it to access the metadata document

    // authority points to our IdentityServer
    authority: authUrl,

    // the client_id is an arbitrary string that matches our IdentityServer4 ClientId
    client_id: "js.implicit",

    // after the user has authenticated with IdentityServer, he will get redirected
    // to our callback page.
    redirect_uri: `${baseUrl}/callback`,

    post_logout_redirect_uri: `${baseUrl}/index`,

    // For JavaScript clients, we want both an identity token and an
    // access token as per Openid Connect.
    response_type: "id_token token",

    // Resources requested during the authorisation request
    scope: "openid email profile chatapi",

    // Number of seconds before the token expires to trigger
    // the `tokenExpiring` event
    accessTokenExpiringNotificationTime: 4,

    // Do we want to renew the access token automatically when it's
    // about to expire?
    automaticSilentRenew: true,

    // Do we want to filter OIDC protocol-specific claims from the response?
    filterProtocolClaims: true,

    nonce : "N" + Math.random() + "" + Date.now()
};

