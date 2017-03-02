export const LOGIN_LOGIN_REQUESTED =       "login/LOGIN_REQUESTED";

export const LOGIN_LOGOUT_REQUESTED =      "login/LOGOUT_REQUESTED";

export const LOGIN_LOGGED_IN =             "login/LOGIN_LOGGED_IN";

export const LOGIN_LOGGED_OUT =            "login/LOGGED_OUT";

export const LOGIN_NETWORK_FAILED =        "login/LOGIN_NETWORK_FAILED";

export const LOGIN_CALLBACK_REQUESTED =    "login/LOGIN_CALLBACK_REQUESTED";

// The following are OIDC-JS related events which are handled
// internally.
// SEE: https://github.com/IdentityModel/oidc-client-js/wiki#events

// Raised when a user session has been established (or re-established).
export const OIDC_USER_LOADED =           "oidc/USER_LOADED";

// Raised when a user session has been terminated.
export const OIDC_USER_UNLOADED =         "oidc/USER_UNLOADED";

// Raised prior to the access token expiring.
export const OIDC_ACCESS_TOKEN_EXPIRING = "oidc/ACCESS_TOKEN_EXPIRING";

// Raised after the access token has expired.
export const OIDC_ACCESS_TOKEN_EXPIRED =  "oidc/ACCESS_TOKEN_EXPIRED";

// Raised when the automatic silent renew has failed.
export const OIDC_SILENT_RENEW_ERROR =    "oidc/SILENT_RENEW_ERROR";

// Raised when the user's signin status at the OP has changed.
// SEE: https://brockallen.com/2016/08/12/check-session-support-in-oidc-client-js/
export const OIDC_USER_SIGNED_OUT =       "oidc/USER_SIGNED_OUT";

export interface IAuthState {
    is_authenticated: boolean;
    access_token?: String;
    expired?: boolean;
    expires_at?: number;
    id_token?: String;
    full_name?: String;
    given_name?: String;
    family_name?: String;
    username?: String;
    email?: String;
    token_type?: String;
    id?: String;
}

