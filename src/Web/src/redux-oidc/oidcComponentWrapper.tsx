import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { oidcActionCreators } from "./oidcActions";

export interface IOidcDispatchProps {
    // TODO: Get rid of any
    oidcActions: any;
}

export const withOidcActions = (Component: typeof React.Component) => {

    class OidcWrapper extends React.Component<IOidcDispatchProps, {}> {

        public render(): JSX.Element {
            return <Component {...this.props} />;
        }
    }

    const mapDispatchToProps: any = (dispatch): IOidcDispatchProps => ({
        oidcActions: Redux.bindActionCreators(oidcActionCreators, dispatch)
    });

    return ReactRedux.connect(null, mapDispatchToProps)(OidcWrapper) as React.ComponentClass<any>;
};
