import * as React from "react";
import * as ReactRouter from "react-router";
import * as ReactRedux from "react-redux";
import "./app.css";
import Error404 from "./errors/error404";
import LoginCallback from "./login/loginCallback";
import Echo from  "./echo/echo";
import Home from "./home";
import MainLayout from "./layout/mainLayout";
import createStoreWithInitialState from "./store";

interface IAppProps {
    initialState: any;
}

class App extends React.Component<IAppProps, null> {
    render() {
        return (
            <ReactRedux.Provider store={createStoreWithInitialState(this.props.initialState)}>
                <ReactRouter.Router history={ReactRouter.browserHistory}>
                    <ReactRouter.Route path="/" component={MainLayout}>
                        <ReactRouter.IndexRoute component={Home}/>
                        <ReactRouter.Route path="/echo" component={Echo}/>
                        <ReactRouter.Route path="/callback" component={LoginCallback}/>
                    </ReactRouter.Route>
                    <ReactRouter.Route path="/*" component={Error404}/>
                </ReactRouter.Router>
            </ReactRedux.Provider>

        );
    }
}

export default App;
