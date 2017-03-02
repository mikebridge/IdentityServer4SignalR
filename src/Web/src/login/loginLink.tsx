import * as React from "react";
import {IOidcDispatchProps, withOidcActions} from "../redux-oidc/oidcComponentWrapper";
import {whenLoggedOut} from "./authComponentWrappers";

interface ILoginLinkOwnProps extends React.HTMLAttributes<HTMLLinkElement> {}

class LoginLinkUnwrapped extends React.Component<IOidcDispatchProps & ILoginLinkOwnProps, {}> {

    public static contextTypes: React.ValidationMap<any> = {
         router: React.PropTypes.object.isRequired
     };

     public onLoginClick(e: MouseEvent) {
         e.preventDefault();
         // get the current route so we know how to get back to this page after login
         const currentRoute = this.context.router.location.pathname;
         this.props.oidcActions.loginRequest(currentRoute);
     }

    public render(): JSX.Element {
         // TODO: is there a way to fix that cast?
         const { oidcActions, ...rest } = this.props;
         return (
             <a href="#" {...rest as any}
                onClick={this.onLoginClick.bind(this)}
             >Login</a>
         );
     }

}

const LoginLink = whenLoggedOut(withOidcActions(LoginLinkUnwrapped));

export default LoginLink;
