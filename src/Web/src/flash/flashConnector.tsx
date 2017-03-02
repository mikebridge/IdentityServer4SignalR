import * as React from "react";
import {IFlashableDispatchProps, withFlash} from "./withFlash";

interface IFlashConnectorProps {
    errors?: string[];
    successes?: string[];
}

// this class is to work around the issue where HOC-wrapped classes
// aren't accessible (easily) via ref.  This class can be used as a child
// of the class that normally would be wrapped, and the properties passed through.
// https://facebook.github.io/react/docs/higher-order-components.html#refs-arent-passed-through

class FlashConnector extends React.Component<IFlashConnectorProps & IFlashableDispatchProps, void> {

    componentWillReceiveProps(nextProps: IFlashConnectorProps & IFlashableDispatchProps) {

        if (nextProps.errors && nextProps.errors !== this.props.errors) {
            this.props.errors.map(err =>
                this.props.flashActions.addFlashErrorMessage(err)
            );
        }
        if (nextProps.successes && nextProps.successes !== this.props.successes) {
            this.props.errors.map(s =>
                this.props.flashActions.addFlashSuccessMessage(s)
            );
        }

    }

    public render(): JSX.Element {
        return null;
    };
}

export default withFlash(FlashConnector);
