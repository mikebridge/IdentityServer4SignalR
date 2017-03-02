import * as Oidc from "oidc-client";
import * as Redux from "redux";
import {
    LOGIN_LOGIN_REQUESTED, LOGIN_CALLBACK_REQUESTED,
    OIDC_USER_LOADED, LOGIN_LOGOUT_REQUESTED
} from "./oidcConstants";
import { oidcActionCreators } from "./oidcActions";
import * as ReactRouter from "react-router";
import {createStateFromUser} from "./oidcReducers";

let _oidcManager: Oidc.UserManager;
let _dispatcher: Redux.Dispatch<any>;

const loadUser = (userManager: Oidc.UserManager, dispatch: Redux.Dispatch<any>) => {
    _oidcManager.getUser().then(user => {
        dispatch(oidcActionCreators.userLoaded(user));

    }).catch((e) => {
        console.error(e);
    });
};

const configureManager = (userManager: Oidc.UserManager, dispatcher: Redux.Dispatch<any>) =>  {

    //userManager.events.addUserLoaded((user) => {
        // MB: on what conditions does this actually fire?  getUser doesn't seem to trigger it.
        //_dispatcher(oidcActionCreators.userLoaded(user));
    //});
    userManager.events.addUserUnloaded(() => dispatcher(oidcActionCreators.userUnloaded()));
    userManager.events.addUserSignedOut(() => dispatcher(oidcActionCreators.userSignedOut()));

    userManager.events.addSilentRenewError(() => dispatcher(oidcActionCreators.silentRenewError()));
    userManager.events.addAccessTokenExpired(() => dispatcher(oidcActionCreators.accessTokenExpired()));
    userManager.events.addAccessTokenExpiring(() => dispatcher(oidcActionCreators.accessTokenExpiring()));

    //    TODO: remove events
    //     events.removeUserLoaded(actions.userLoaded);
    //     events.removeSilentRenewError(actions.silentRenewError);
    //     events.removeAccessTokenExpired(actions.accessTokenExpired);
    //     events.removeAccessTokenExpiring(actions.accessTokenExpiring);
    //     events.removeUserUnloaded(actions.userUnloaded);
    //     events.removeUserSignedOut(actions.userSignedOut);
};

const signIn = (userManager: Oidc.UserManager,
                currentRoute: string,
                dispatch: Redux.Dispatch<any>
    ) => {
    userManager.signinRedirect({ data: currentRoute }).then(() => {
        //console.log("redirecting...");
    }).catch(reason => {
        if (reason.message === "Network Error") {
            console.error("The authentication server is currently unavailable.");
            dispatch(oidcActionCreators.loginNetworkFailed("The authentication server is currently unavailable."));
        } else {
            console.error(reason.message);
            dispatch(oidcActionCreators.loginNetworkFailed(reason.message));
        }
    });
};

// side effect: ReactRouter will navigate to the value of result.state
const signInRedirectCallback = (userManager: Oidc.UserManager,
                                dispatch: Redux.Dispatch<any>) => {

    userManager.signinRedirectCallback().then(result => {
        userManager.getUser().then(user => {
            dispatch(oidcActionCreators.userLoaded(user));
        }).catch((e) => {
            console.error(e);
        });
        ReactRouter.browserHistory.push(result.state || "/");

    }).catch((reason) => {
        console.error(reason);
    });
};

const signOut = (userManager: Oidc.UserManager,
                 dispatch: Redux.Dispatch<any>) => {

    userManager.signoutRedirect().then(() => {
        //console.log("Logged out.");
    }).catch(reason => {
        if (reason.message === "Network Error") {
            dispatch(oidcActionCreators.loginNetworkFailed("The authentication server is currently unavailable."));
        } else {
            dispatch(oidcActionCreators.loginNetworkFailed(reason.message));
        }
    });
};

// create the logged-in status for the store for when the page is reloaded
export const oidcGetInitialLoginState = () => {
    return _oidcManager.getUser().then(user => {
        return {
            oidc: createStateFromUser(user)
        };
    }).catch(e => console.error("ERROR", e));
};

// side-effects: we need to set the _oidcManager
// and _dispatcher so that we can later create the initial state via
// oidcSetInitialLoginState.
export default function createOidcMiddleware(settings: Oidc.UserManagerSettings) {

    _oidcManager = new Oidc.UserManager(settings);

    const oidcAuthStateHandler = (store) => {

        if (!store.dispatch) {
            throw new Error("Dispatch is missing");
        }
        configureManager(_oidcManager, store.dispatch);
        _dispatcher = store.dispatch;

        return next => action => {

            switch (action.type) {
                case LOGIN_LOGIN_REQUESTED:
                    signIn(_oidcManager, action.currentRoute, store.dispatch);
                    break;
                case LOGIN_CALLBACK_REQUESTED:
                    signInRedirectCallback(_oidcManager, store.dispatch);
                    break;
                case LOGIN_LOGOUT_REQUESTED:
                    signOut(_oidcManager, store.dispatch);
                    break;
                case OIDC_USER_LOADED:
                    store.dispatch(oidcActionCreators.loggedIn(action.user));
                    break;
                default:
                    break;
            }

            return next(action);
        };
    };

    return oidcAuthStateHandler;

};

