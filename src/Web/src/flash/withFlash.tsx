import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { flashActionCreators } from "./flashActions";

/*
 * Add the ability to use the flash message to a child component
 * without that child component needing to know about Redux.
 *
 * via "Props Proxy" HOC pattern (see
 * https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#b547)
 *
 * Usage:
 *
 *     import { withFlash } from "../flash/flashable";
 *
 *     class MyUnwrappedComponent extends React.Component<IMyComponentProps & IFlashableDispatchProps, {}> {
 *
 *          public myFunction(): void {
 *              this.props.flashActions.addFlashErrorMessage("My Error Message");
 *         }
 *     }
 *
 *     export const MyComponent = withFlash(MyUnwrappedComponent);
 *
 */

export interface IFlashableDispatchProps {
    flashActions: any;
}

export const withFlash = (Component: typeof React.Component) => {

    class Flashable extends React.Component<IFlashableDispatchProps, {}> {

        //private childRef: React.Component<any, any> = null;

        public render(): JSX.Element {
            //return <Component ref={(c) => { this.childRef = c; }} {...this.props} />;
            return <Component {...this.props} />;
        }
    }

    const mapDispatchToProps: any = (dispatch): IFlashableDispatchProps => ({
        flashActions: Redux.bindActionCreators(flashActionCreators, dispatch)
    });

    return ReactRedux.connect(null, mapDispatchToProps)(Flashable) as React.ComponentClass<any>;
};


