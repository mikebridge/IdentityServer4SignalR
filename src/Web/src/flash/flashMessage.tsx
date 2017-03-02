import * as React from "react";
import { IFlashMessageProps } from "./flashConstants";
//import * as classnames from "classnames";

export class FlashMessage extends React.Component<IFlashMessageProps, void> {

    public static propTypes: React.ValidationMap<any> = {
        message: React.PropTypes.object.isRequired,
        deleteFlashMessage: React.PropTypes.func.isRequired
    };

    public onClick(e: MouseEvent): void {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    public render(): JSX.Element {
        //const fg = this.props.color || "red";
        const icon = "M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 " +
            "L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6";
        const { type, text } = this.props.message;
        const fg = type === "success" ? "green" : "red";

        return (
            <div className={"flex items-center justify-center pa4 bg-light-gray " + fg}>
                <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{fill: fg}}>
                    <title>info icon</title>
                    <path d={icon} />
                </svg>
                <div className="absolute right-2">
                    <button className="close closeTab bn bg-light-gray"
                            style={{ cursor: "pointer" }}
                            type="button"
                            onClick={this.onClick.bind(this)}>
                        <span className="f3">&times;</span></button>
                </div>
                <span className="lh-title ml3">{text}</span>

            </div>


        );
    }

}
