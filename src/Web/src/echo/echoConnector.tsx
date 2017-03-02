import * as React from "react";
//import FlashConnector from "../flash/flashConnector";
import {withSignalR, ISignalRConnectorProps} from "../react-signalr/signalrConnector";
import {withAuthToken} from "../redux-oidc/withAuthToken";
import {IEchoMessage} from "./echoConstants";


interface IEchoConnectorState {
    messages: IEchoMessage[];
}

/*
 * a HOC that handles the Echo functions in SignalR
 */

export const withEchoConnector = (ConnectedComponent: typeof React.Component,
                                  DisconnectedComponent: React.ReactType) => {


    class WrappedChatConnector extends React.Component<ISignalRConnectorProps,
        IEchoConnectorState> {


        public constructor(props: ISignalRConnectorProps) {
            super(props);
            this.state = this.state || {messages: []};
        }

        componentWillMount() {
            this.props.openConnection();
        }

        componentWillUnmount() {
            this.props.closeConnection();
        }

        // send a message from client to server
        public sendMessage = (message: String) => {
            // console.log("echoConnector.sendMessage", message);
            this.props.invoker("sendMessage", message);
        }

        // server-to-client message handlers.
        // this is initialized by passing the name of the signalR client-side javascript
        // function (i.e. "echoMessage") that we want to listen for into the "clientmethods"
        // attribute of SignalRConnector.
        public echoMessage(message: string) {
            this.setState(Object.assign({}, this.state, {messages: [...this.state.messages, message]}));
        }

        public render(): JSX.Element {
            const childProps = {
                sendMessageToServer: this.sendMessage,
                messages: this.state.messages
            };
            //const errors = [this.props.connectionError, this.props.invocationError]
            //    .filter(x => x !== null && x !== undefined);
            //console.log(">>> echoConnector RENDERS ", childProps);

            return (
                (this.props.isConnected
                ? <ConnectedComponent {...childProps} />
                : <DisconnectedComponent {...childProps} />)
            );
        }

    }

    return withAuthToken(withSignalR(WrappedChatConnector));
};

export default withEchoConnector;

