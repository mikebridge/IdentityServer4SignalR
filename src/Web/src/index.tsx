import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";
import {oidcGetInitialLoginState} from "./redux-oidc/oidcMiddleware";
import App from "./app";

oidcGetInitialLoginState().then(
    state => {
        ReactDOM.render(
            <App initialState={state}/>,
            document.getElementById("app") as HTMLElement
        );

    });

