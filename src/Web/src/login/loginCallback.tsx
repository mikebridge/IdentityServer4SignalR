import * as React from "react";

import {withOidcActions, IOidcDispatchProps} from "../redux-oidc/oidcComponentWrapper";

interface ILoginCallbackOwnProps extends React.HTMLAttributes<HTMLLinkElement> {}

class LoginCallbackUnwrapped extends React.Component<IOidcDispatchProps & ILoginCallbackOwnProps, {}> {

    public componentDidMount() {
        this.completeSignup();
    }

    public completeSignup() {
        this.props.oidcActions.newLoginCallbackRequest();
    }

    public render(): JSX.Element {
        return (
            <div>Signing in...</div>
        );
    }

}

const LoginCallback = withOidcActions(LoginCallbackUnwrapped);

export default LoginCallback;