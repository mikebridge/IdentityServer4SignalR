import * as React from "react";
import * as classnames from "classnames";
import * as update from "immutability-helper";
//import "expose-loader?jQuery!jquery";
//import "expose-loader?$!jquery";
import * as $ from "jquery";
(window as any).jQuery = $; // hack to get SignalR to find it
import "signalr";

import MessageList from "./messageList";
import {withEchoConnector} from "./echoConnector";
import NotConnectedToSignalR from "./notConnectedToSignalR";
import {IEchoMessage} from "./echoConstants";

// the props that come from react
interface IEchoDispatchProps {
    sendMessageToServer: (message: String) => Promise<any>;
    isConnectedToServer: boolean;
}

interface IEchoOwnProps {
    messages: IEchoMessage[];
}

interface IEchoState {
    message: string;
}

const initialState = {
    message: "",
};

class EchoDialog extends React.Component<IEchoDispatchProps & IEchoOwnProps, IEchoState> {

    constructor(props: IEchoDispatchProps & IEchoOwnProps) {
        super(props);
        this.state = this.state || initialState;
    }

    onSendClick(e: React.MouseEvent<any>) {
        e.preventDefault();
        this.props.sendMessageToServer(this.state.message);
        //this.invokeHubMethod("sendMessage", this.state.message);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.target as HTMLInputElement; // why is the cast required?
        const diff = { [name]: {$set: value} };
        this.setState(update(this.state, diff));
    }


    render() {
        const btnTextColor = "white";
        const btnBgColor = "bg-black-70";
        const btnBgHoverColor = "hover-bg-black";
        const style = {};
        const disabled = false;
        //console.log("MESSAGES", this.props.messages);
        /*const btnTextColor = this.state.connectionid ? "white" : "lightGrey";*/
        // const btnBgColor = this.state.connectionid ? "bg-black-70" : "bg-grey";
        // const btnBgHoverColor = this.state.connectionid ? "hover-bg-black" : "light-silver";
        // const style = this.state.connectionid ? {} : {cursor: "progress"} ;
        // const disabled = !this.state.connectionid;
        //console.log(classnames("test"));
        return (

                <div className="mt0 pa4-l">
                    <form className="bg-light-green mw6 center pa4 br3-ns ba b--black-10">
                        <fieldset className="cf bn ma0 pa0">
                            <legend className="pa0 f5 f4-ns mb3 black-80">Send via SignalR</legend>

                            <div className="cf">
                                <label className="clip" htmlFor="email-address">Email Address</label>
                                <input className={classnames("f6", "f5-l", "input-reset", "bn", "fl", "black-80",
                                                             "bg-white", "pa3", "lh-solid", "w-100", "w-75-m",
                                                             "w-80-l", "br2-ns", "br--left-ns")}
                                       placeholder="Text"
                                       type="text"
                                       name="message"
                                       id="echo-text"
                                       value={this.state.message}
                                       onChange={this.handleChange.bind(this)}
                                />
                                <input className={classnames("f6", "f5-l", "button-reset", "fl", "pv3",
                                                             "tc", "bn", "bg-animate", btnBgColor, btnBgHoverColor,
                                                             btnTextColor, "pointer", "w-100", "w-25-m",
                                                             "w-20-l", "br2-ns", "br--right-ns")}
                                       type="submit"
                                       value="Send"
                                       disabled={disabled}
                                       style={style}
                                       onClick={this.onSendClick.bind(this)} />
                            </div>
                        </fieldset>
                    </form>
                    <div className="mw6 center">
                        <MessageList messages={this.props.messages}/>
                    </div>
                </div>
        );
    }

}

export default withEchoConnector(EchoDialog, NotConnectedToSignalR);

