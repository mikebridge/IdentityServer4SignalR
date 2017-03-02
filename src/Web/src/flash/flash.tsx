import * as React from "react";
import * as ReactRedux from "react-redux";
import { IFlashMessage, IFlashProps } from "./flashConstants";
import { FlashMessage } from "./flashMessage";
import { deleteFlashMessage } from "./flashActions";

class Flash extends React.Component<IFlashProps, void> {

    public static propTypes: React.ValidationMap<any> = {
        messages: React.PropTypes.any.isRequired
    };

    public render(): JSX.Element {
        const messageComponents =
            this.props.messages.map((m: IFlashMessage) => (
                <FlashMessage message={m} key={m.id} deleteFlashMessage={this.props.deleteFlashMessage.bind(this)} />
            ));
        return (
            <div>{messageComponents}</div>
        );
    };

}


const mapStateToProps: any = state => {
    return {messages: state.flash};
};


export default ReactRedux.connect(mapStateToProps, { deleteFlashMessage })( Flash );

