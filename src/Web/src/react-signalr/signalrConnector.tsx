import * as React from "react";
import * as $ from "jquery";
(window as any).jQuery = $; // hack to get SignalR to find it
import "signalr";

import {IWithAuthChildComponentProps} from "../redux-oidc/withAuthToken";
import {withFlash, IFlashableDispatchProps} from "../flash/withFlash";

export interface ISignalRViewProps {
    hub: string;
    url: string;
    logging?: boolean;
    clientmethods?: string[];
    errorHandler?: (err: string) => void;
}

// props that the child connector will receive
// from the parent SignalRConnector.

export interface ISignalRConnectorProps {
    invoker: (method: string, ...args: any[]) => void;
    isConnected: boolean;
    openConnection: () => void; // test use only
    closeConnection: () => void; // test use only
}

export interface ISignalRState {
    isConnected: boolean;
}

const initialState: ISignalRState = {
    isConnected: false
};

// TODO: make this Component a type that implements the
// props we need to inject.
export const withSignalR = (Component: typeof React.Component) => {

    class SignalRConnector extends React.Component<ISignalRViewProps & IWithAuthChildComponentProps
        & IFlashableDispatchProps, ISignalRState> {

        public static propTypes: React.ValidationMap<any> = {
            hub: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            logging: React.PropTypes.bool,
            clientmethods: React.PropTypes.arrayOf(React.PropTypes.string),
            requireauthtoken: React.PropTypes.bool,
            valid_access_token: React.PropTypes.string
        };

        private authToken?: string = null;

        private wrappedComponentRef: React.Component<any, any> = null;

        private hubConnection: SignalR.Hub.Connection = null;

        private proxy: SignalR.Hub.Proxy = null;

        public constructor(props: ISignalRViewProps & IWithAuthChildComponentProps & IFlashableDispatchProps) {
            super(props);
            this.state = this.state || initialState;
        }

        public componentWillMount() {
            this.authToken = this.props.valid_access_token;

            // SEE: http://infozone.se/en/authenticate-against-signalr-2/#codesyntax_5

            this.hubConnection = this.createhubConnection();
            this.proxy = this.createProxy(this.hubConnection);

            //this.connectToSignalRHub();

        }

        public componentDidUpdate() {
            // "This is also a good place to do network requests as
            // long as you compare the current props to previous props"

            // Object {connecting: 0, connected: 1, reconnecting: 2, disconnected: 4}
            //const signalRConnectionStatus = this.hubConnection.state;
            const isAuthUpdated = this.authToken !== this.props.valid_access_token;

            this.authToken = this.props.valid_access_token;
            if (isAuthUpdated) {
                // the only way to change the auth token in signalr is to
                // disconnect, then reset the token and connect again.
                this.disconnectFromSignalRHub();
                this.setAuthToken(this.hubConnection, this.props.valid_access_token);
                this.connectToSignalRHub();
            }
        }

        public invoker = (method: string, ...args: any[]): void => {
            if (this.authIsMissing()) {
                console.warn(`NOT invoking ${method}: auth is missing`);
                return;
            }
            this.proxy.invoke(method, ...args).done(() => {
                //console.log(`Invocation of ${method} succeeded`);
            }).fail((error) => {
                console.error(`Invocation of ${method} failed`, error);
                this.props.flashActions.addFlashErrorMessage(`Invocation of ${method} failed: ${error}`);
            });
        }

        public render(): JSX.Element {

            const childProps = {
                isConnected: this.state.isConnected,
                invoker: this.invoker.bind(this),
                openConnection: this.connectToSignalRHub.bind(this), // test only
                closeConnection: this.disconnectFromSignalRHub.bind(this), // test only
            };

            return (
                <Component ref={(c) => { this.wrappedComponentRef = c; }}
                    {...this.props}
                    {...childProps} />
            );
        }



        // catch whatever (registered) calls come back
        // from the server.
        public serverMessageHandler(method: string, ...args: any[]) {

            // Dynamically invoke the child component responding
            // method if it exists.
            if (this.wrappedComponentRef[method]) {
                this.wrappedComponentRef[method](...args);
            } else {
                console.warn("No method " + method);
            }
        }

        private setAuthToken(hubConnection: SignalR.Hub.Connection, token: string) {
            hubConnection.qs = token ? `authtoken=${this.props.valid_access_token}` : "";
        }


        private authIsMissing = (): boolean => {
            return this.props.requireauthtoken && !this.props.valid_access_token;
        }

        private createhubConnection() {

            const hubConnection = ($ as any).hubConnection(this.props.url);

            if (this.props.logging) {
                hubConnection.logging = true;
            }
            this.setAuthToken(hubConnection, this.props.valid_access_token);

            hubConnection.connectionSlow(() => this.onConnectionSlow());
            hubConnection.reconnected(() => this.onReconnected());
            hubConnection.starting(() => this.onStarting());
            hubConnection.received(() => this.onReceived());
            hubConnection.reconnecting(() => this.onReconnecting());
            hubConnection.disconnected(() => this.onDisconnected());
            hubConnection.stateChanged((newState) => this.onStateChange(newState));
            hubConnection.error((error) => this.onError(error));

            return hubConnection;
        }

        private disconnectFromSignalRHub() {

            if (this.authIsMissing()) {
                console.warn("NOT disconnecting: auth is missing");
                return;
            }
            if (this.hubConnection.state !== ($ as any).signalR.connectionState.disconnected) {
                this.hubConnection.stop();
            }
        }

        private connectToSignalRHub() {
            // as far as I can see, signalr doesn't fire
            // state change events during "start".
            if (this.authIsMissing()) {
                console.warn("NOT Connecting: auth is missing");
                return;
            }
            this.hubConnection.start()
                .done(() => {
                    this.onConnected(this.hubConnection.id);
                    //console.log("Now connected, connection ID=" + this.hubConnection.id);
                })
                .fail((error) => {
                    console.error("Could not connect to the server.");  // Where is the XHR error?
                    this.props.flashActions.addFlashErrorMessage("Could not connect to the server.");
                    //const errorMsg = "Could not connect to the server.";
                    //const newState = Object.assign({}, this.state, {connectionError: errorMsg});
                    //this.setState(newState);
                });
        }

        private createProxy(hubConnection: SignalR.Hub.Connection) {
            const proxy = hubConnection.createHubProxy(this.props.hub);

            // tslint:disable-next-line
            // see: https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client
            for (const method of this.props.clientmethods || []) {
                const fn = (...args: any[]) => this.serverMessageHandler(method, ...args);
                proxy.on(method, fn.bind(this));
            }
            return proxy;
        }

        private getLastError(hubConnection: SignalR.Hub.Connection): Error {
            return hubConnection.lastError;
        }

        private onDisconnected = (): void => {
            console.log("onDisconnected");

            this.setState({isConnected: false});
        }

        private onReconnecting = (): void => {
            console.log("onReconnecting");
            //this.setState(Object.assign({}, this.state, {isConnected: false}));
        }

        // "Connecting, Connected, Reconnecting, or Disconnected" ??
        private onStateChange = (newState: string): void => {
            console.log("onStateChange", newState);
        }

        private onConnectionSlow = (): void => {
            console.log("onConnectionSlow");
        }

        private onReceived = (): void => {
            //console.log("ON RECEIVED =====================================================");
            console.log("onReceived");
        }

        private onStarting = (): void => {
            console.log("onStarting");
        }

        private onReconnected = (): void => {
            // TODO: set the connectionid
            console.log("onReconnected");
            this.setState({isConnected: true});
        }

        private onConnected = (id: string): void => {
            this.setState({isConnected: true});
            console.log(`onConnected ${id}`);
        }

        private onError = (error: String): void => {
            console.error("ERROR", error);
        }

    }
    return withFlash(SignalRConnector);
};

export default withSignalR;
