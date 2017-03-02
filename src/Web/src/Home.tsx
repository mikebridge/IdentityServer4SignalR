import * as React from "react";
import {withAuthToken} from "./redux-oidc/withAuthToken";

import {IWithAuthChildComponentProps} from "./redux-oidc/withAuthToken";

class Home extends React.Component<IWithAuthChildComponentProps, {}> {

    public render(): JSX.Element {

        const btnClass = "no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2";
        const { valid_identity_token, valid_access_token } = this.props;
        if (valid_identity_token && valid_access_token) {
            return (
                <div>
                    <section className="ph3 ph5-ns pv5">

                        <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
                            <div className="dt-ns dt--fixed-ns w-100">
                                <div className="pa3 pa4-ns dtc-ns v-mid">
                                    <div>
                                        <h2 className="fw4 blue mt0 mb3">JWT Info</h2>
                                        <p className="black-70 measure lh-copy mv0">
                                            View your tokens on JWT.io
                                        </p>
                                    </div>
                                </div>
                                <div className="pa1 pa4-ns dtc-ns v-mid">
                                    <a href={`https://jwt.io/#id_token=${valid_access_token}`}
                                       className={btnClass}
                                       target="_blank">Access Token</a>
                                </div>
                                <div className="pa3 pa4-ns dtc-ns v-mid">
                                    <a href={`https://jwt.io/#id_token=${valid_identity_token}`}
                                       className={btnClass}
                                       target="_blank">Identity Token</a>
                                </div>
                            </div>
                        </article>
                    </section>

                </div>
            );
        } else {
            return(<div>Please log in!</div>);
        }
    }
}

export default withAuthToken(Home);
