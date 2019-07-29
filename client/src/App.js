import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import {Container} from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Protected from './pages/Protected';
import Register from "./pages/Register";
import Login from "./pages/Login";


class App extends React.Component {
    render() {
        return (
    
            <Router>
                <div>
                    <AppNavbar/>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/" component={Protected} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
//TODO: main page - google react auto complete
//TODO: user about&back end req
//TODO: user weatherlist&back end req
//TODO: user weather details&back end req

export default App;
