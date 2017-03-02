import * as React from "react";
import * as ReactRedux from "react-redux";

// this is what child components will receive in
// props.
export interface IWithAuthChildComponentProps {
    requireauthtoken: boolean;
    valid_access_token?: string;
    valid_identity_token?: string;
}

interface IWithAuthTokenState {}

// TODO: these should just be passed through,
// not declared
interface IWithAuthTokenOwnProps {
    hub: string;
    url: string;
    logging?: boolean;
    clientmethods?: string[];
}

interface IAuthStatus {
    is_authenticated: boolean;
    id?: string;
    valid_access_token?: string;
    valid_identity_token?: string;
}

export interface IWithAuthTokenDispatchProps {
    auth: IAuthStatus;
}

//
// Respond to changes in authentication / identity status
// and pass that information to the child component.
//
//export const withAuthToken = (Component: typeof React.Component) => {
export const withAuthToken = (Component: React.ComponentClass<IWithAuthChildComponentProps>) => {

    class WithAuthToken extends React.Component<IWithAuthTokenDispatchProps,
        IWithAuthTokenState> {

        //public static propTypes: React.ValidationMap<any> = {
        // var1: React.PropTypes.number.isRequired,
        // actions: React.PropTypes.shape({
        //     myfunc: React.PropTypes.func.isRequired
        // }),
        // flashActions: React.PropTypes.shape({
        //     addFlashSuccessMessage: React.PropTypes.func.isRequired,
        //     addFlashErrorMessage: React.PropTypes.func.isRequired,
        // }),
        //};

        public render(): JSX.Element {

            const childProps: IWithAuthChildComponentProps = {
                requireauthtoken: true,
                valid_access_token: this.props.auth.valid_access_token,
                valid_identity_token: this.props.auth.valid_identity_token
            };

            const {auth, ...filteredprops} = this.props;

            return (
                <Component {...filteredprops} {...childProps} />
            );
        }
    }

    const mapStateToProps: any = (state): IWithAuthTokenDispatchProps => ({
        auth: {
            id: state.oidc.id,
            valid_access_token: state.oidc.access_token,
            valid_identity_token: state.oidc.id_token,
            is_authenticated: state.oidc.is_authenticated
        }
    });

    return ReactRedux.connect(mapStateToProps)(WithAuthToken) as React.ComponentClass<IWithAuthTokenOwnProps>;

};


export default withAuthToken;
