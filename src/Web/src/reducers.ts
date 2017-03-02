import { combineReducers } from "redux";

import flash from "./flash/flashReducers";
import oidc from "./redux-oidc/oidcReducers";

export default combineReducers({
    flash,
    oidc,
});
