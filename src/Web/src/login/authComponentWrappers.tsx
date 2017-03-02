import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

interface IWhenLoggedInProps {
    is_authenticated: boolean;
    dispatch: Redux.Dispatch<any>;
}

const whenLoggedInOrOut = (Component, showWhenLoggedIn: boolean) => {

    class WhenLoggedIn extends React.Component<IWhenLoggedInProps, {}> {

        public static propTypes: React.ValidationMap<any> = {
            is_authenticated: React.PropTypes.bool.isRequired
        };

        public render(): JSX.Element {
            const { is_authenticated, dispatch, ...rest } = this.props;

            return is_authenticated === showWhenLoggedIn ? <Component {...rest} /> : <span />;
        }

    }

    const mapStateToProps = (state) => (
        state.oidc
            ? { is_authenticated: state.oidc.is_authenticated && !state.oidc.expired }
            : { is_authenticated: false}
        );


    return ReactRedux.connect(mapStateToProps, null)(WhenLoggedIn); //as React.ComponentClass<IWhenLoggedInProps>;
};

export const whenLoggedIn = (Component): React.ComponentClass<any> => whenLoggedInOrOut(Component, true);

export const whenLoggedOut = (Component): React.ComponentClass<any> => whenLoggedInOrOut(Component, false);

// export const WhenLoggedIn = ({component: Component, children, ...props}) => {
//     return whenLoggedInOrOut(<Component {...props}>{children}</Component>, true) as React.ComponentClass<any>;
// };
