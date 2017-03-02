import * as flashActions from  "../flash/flashActions";
import "rxjs/Rx";
import * as ReduxObservable from "redux-observable";
import * as oidcConstants from "../redux-oidc/oidcConstants";

// todo: change any to IFlashFailure or something
const flashNotifications = (action$: ReduxObservable.ActionsObservable<any>, store) => {
    return action$.ofType(oidcConstants.LOGIN_NETWORK_FAILED)
    // maybe move the IAjaxFailed to a separate file
        .do(() => console.log("TRIGGERING ACTION"))
        .map((action) => {
            return flashActions.flashActionCreators.addFlashErrorMessage(action.message);
        });
};


export default ReduxObservable.combineEpics(flashNotifications);
