import * as React from "react";
import {Link} from "react-router";
import * as classnames from "classnames";

import Flash from "../flash/flash";
import LoginLink from "../login/loginLink";
import LogoutLink from "../login/logoutLink";

class MainLayout extends React.Component<{}, {}> {
    public render(): JSX.Element {
        const linkClasses = classnames("f6", "f5-l", "link", "bg-animate",
                                       "black-80", "hover-bg-lightest-blue",
                                       "dib", "pa3", "ph4-l");
        return (
            <div className="app">
                <Flash />
                <header className="bg-white black-80 tc pv4 avenir">
                    <h2 className="mt2 mb0 f3 fw4">OpenID Connect / JWT and SignalR Example</h2>
                    <nav className="bt bb tc mw7 center mt4">
                        <Link className={linkClasses} to="/"  activeClassName="active">Home</Link>
                        <Link className={linkClasses} to="/echo"  activeClassName="active">Echo</Link>
                        <LoginLink className={linkClasses}>Login</LoginLink>
                        <LogoutLink className={linkClasses}>Logout</LogoutLink>
                    </nav>
                </header>

                <main className="bg-white black-80 tc avenir">
                    <div>
                    {this.props.children}
                    </div>
                </main>
            </div>
        );
    }
}

export default MainLayout;
