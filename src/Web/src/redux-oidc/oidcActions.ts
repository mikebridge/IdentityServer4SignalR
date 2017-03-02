import * as OidcConstants from "./oidcConstants";

// TODO: Figure out what type this is

// application events
const loggedIn = (user: any) => ({
    type: OidcConstants.LOGIN_LOGGED_IN,
    user
});

const loggedOut = () => ({
    type: OidcConstants.LOGIN_LOGGED_OUT
});

const loginRequest = (currentRoute: string) => ({
    type: OidcConstants.LOGIN_LOGIN_REQUESTED,
    currentRoute
});

const logoutRequest = (currentRoute: string) => ({
    type: OidcConstants.LOGIN_LOGOUT_REQUESTED
});


const newLoginCallbackRequest = (redirectRoute: string) => ({
    type: OidcConstants.LOGIN_CALLBACK_REQUESTED,
    redirectRoute
});


const loginNetworkFailed =  (message: string) => ({
    type: OidcConstants.LOGIN_NETWORK_FAILED,
    message
});


// oidc-js events

const userLoaded = (user) => ({
    type: OidcConstants.OIDC_USER_LOADED,
    user: user
});

const userUnloaded = () => ({
    type: OidcConstants.OIDC_USER_UNLOADED
});

const userSignedOut = () => ({
    type: OidcConstants.OIDC_USER_SIGNED_OUT
});

const silentRenewError = () => ({
    type: OidcConstants.OIDC_SILENT_RENEW_ERROR
});

const accessTokenExpired = () => ({
    type: OidcConstants.OIDC_ACCESS_TOKEN_EXPIRED
});

const accessTokenExpiring = () => ({
    type: OidcConstants.OIDC_ACCESS_TOKEN_EXPIRING
});


export const oidcActionCreators: any = {
    loginRequest,
    newLoginCallbackRequest,
    logoutRequest,
    loggedIn,
    loggedOut,
    loginNetworkFailed,
    userLoaded,
    userUnloaded,
    userSignedOut,
    silentRenewError,
    accessTokenExpired,
    accessTokenExpiring,

};
