import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkLogin } from '../store/thunks/userThunks';
import Main from '../pages/Main';
import History from '../pages/History';
import HistoryDetails from '../pages/HistoryDetails';
import About from '../pages/About';


class Protected extends React.Component {

    componentDidMount() {
        const { checkLogin } = this.props;
        checkLogin();
    }
    

    
    render() {
        const { isLogined, requestCompleted } = this.props;
        if (!isLogined && !requestCompleted) return null;
        else if (!isLogined && requestCompleted) return <Redirect to="/login" />
        return (
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/history" component={History} />
                <Route path="/historyDetails/:_id" component={HistoryDetails} />
                <Route path="/about" component={About} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLogined: state.userStore.isLogined,
    requestCompleted: state.userStore.requestCompleted
});


export default connect(mapStateToProps, {
    checkLogin
})(Protected)