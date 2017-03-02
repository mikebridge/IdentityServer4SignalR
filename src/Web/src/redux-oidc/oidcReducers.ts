import * as Redux from "redux";
import * as constants from "./oidcConstants";
import * as Oidc from "oidc-client";

const loggedOutState = {
    is_authenticated: false
};

export const createStateFromUser = (user: Oidc.User): constants.IAuthState => {
    return user ?
        {
            access_token: user.access_token,
            expired: user.expired,
            expires_at: user.expires_at,
            id_token: user.id_token,
            is_authenticated: true,
            full_name: user.profile.name,
            given_name: user.profile.given_name,
            family_name: user.profile.family_name,
            username: user.profile.preferred_username,
            email: user.profile.email,
            token_type: user.token_type,
            id: user.profile.sub
        } : loggedOutState;
};

export default function oidc(state: constants.IAuthState = loggedOutState, action: any) {

    switch (action.type) {
        case constants.OIDC_USER_UNLOADED:
            //console.log("Reducers: User Unloaded");
            return Object.assign({}, state, loggedOutState);

        case constants.OIDC_USER_LOADED:
            //console.log("Reducers: User Loaded");
            return Object.assign({}, state, createStateFromUser(action.user));

        case constants.OIDC_USER_SIGNED_OUT:
            //console.log("Reducers: User SIGNED OUT");
            return Object.assign({}, state, loggedOutState);

        case constants.OIDC_ACCESS_TOKEN_EXPIRED:
            // console.log("ACCESS TOKEN EXPIRED");
            return state;

        case constants.OIDC_ACCESS_TOKEN_EXPIRING:
            // console.log("ACCESS TOKEN EXPIRING");
            return state;

        case constants.OIDC_SILENT_RENEW_ERROR:
            // console.log("SILENT RENEW ERROR");
            return Object.assign({}, state, loggedOutState);

        case constants.LOGIN_CALLBACK_REQUESTED:
            // console.log("SILENT RENEW ERROR");
            return state;

        default:
            return state;
    }
}

