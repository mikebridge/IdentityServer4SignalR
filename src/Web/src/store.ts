import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createOidcMiddleware from "./redux-oidc/oidcMiddleware";
import * as ReduxObservable from "redux-observable";
import {oidcImplicitSettings} from "./config/oidcConfig";
import epics from "./epics";

const epicMiddleware = ReduxObservable.createEpicMiddleware(epics);
const oidcMiddleware = createOidcMiddleware(oidcImplicitSettings);

//const devToolsExtension =  (window as any).devToolsExtension && (window as any).devToolsExtension();
const devToolsExtension = (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f;

const createStoreWithInitialState = (initialState) => createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(oidcMiddleware, epicMiddleware),
        devToolsExtension
       )
);

export default createStoreWithInitialState;

