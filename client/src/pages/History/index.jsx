import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {getWeatherHistory} from '../../store/thunks/historyThunks';
import HistoryTable from "../../components/HistoryTable";
import {StyledHeaderMain} from "../../components/shared/StyledHeaders";



class History extends React.Component {
    componentDidMount() {
        this.performWeatherHistoryRequest();
    }
    
    performWeatherHistoryRequest = () => {
        console.log('Loading user history');
        try {
            this.props.getWeatherHistory();
            return true;
        }
        catch (err) {
            console.log('weather history request fail!');
            throw err;
        }
    };
    
    render() {
        return (
            <Container>
                <StyledHeaderMain>
                    User Queries
                </StyledHeaderMain>
                <HistoryTable/>
            </Container>
        );
    }
}


export default connect(null, {getWeatherHistory})(History);