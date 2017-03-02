import * as React from "react";
import "tachyons";

class Error404 extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div>
            <section className="vh-100 hover-bg-washed-red baskerville">
                <header className="tc ph5 lh-copy">
                    <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-red">404</h1>
                    <h2 className="tc f1-l fw1">That page is MISSING!</h2>
                </header>
                <p className="fw1 i tc mt4 mt5-l f4 f3-l">Are you looking for the <a href="/chat">Chat page</a>?</p>
            </section>
            </div>
        );
    }
}

export default Error404;


