import * as React from "react";
import {IEchoMessage} from "./echoConstants";

interface IMessageProps {
    message: IEchoMessage;
}

interface IMessageListProps {
    messages: IEchoMessage[];
}

const Message = (props: IMessageProps) => <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
    <span className="dark-red">{props.message.fullName}</span>: {props.message.message}</li>;

const MessageList = (props: IMessageListProps) => {
    const messages = props.messages.map((message, index) => <Message key={index} message={message}/>);
    return (
        <div>
            <ul className="list pl0 tl">
                {messages}
            </ul>
        </div>
    );
};

export default MessageList;