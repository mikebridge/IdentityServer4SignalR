import * as React from "react";
import {IOidcDispatchProps, withOidcActions} from "../redux-oidc/oidcComponentWrapper";
import {whenLoggedIn} from "./authComponentWrappers";

interface ILogoutLinkOwnProps extends React.HTMLAttributes<HTMLLinkElement> {}

class LogoutLinkUnwrapped extends React.Component<IOidcDispatchProps & ILogoutLinkOwnProps, {}> {

    public static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object.isRequired
    };

    public onLogoutClick(e: MouseEvent) {
        e.preventDefault();
        this.props.oidcActions.logoutRequest();
    }

    public render(): JSX.Element {
        // TODO: is there a way to fix that cast?
        const { oidcActions, ...rest } = this.props;
        return (
            <a href="#" {...rest as any}
               onClick={this.onLogoutClick.bind(this)}
            >Logout</a>
        );
    }

}

const LogoutLink = whenLoggedIn(withOidcActions(LogoutLinkUnwrapped));

export default LogoutLink;
