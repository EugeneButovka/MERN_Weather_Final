import React from 'react';
import {
    Container,
    Label, ListGroup, ListGroupItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {getWeatherDetails} from '../../store/thunks/detailsThunks';
import WeatherTable from "../../components/shared/WeatherTable";
import {StyledHeaderMain} from "../../components/shared/StyledHeaders";


class HistoryDetails extends React.Component {
    componentDidMount() {
        this.performWeatherDetailsRequest();
    }
    
    performWeatherDetailsRequest = () => {
        console.log('Loading user history details');
        try {
            this.props.getWeatherDetails(this.props.match.params._id);
            return true;
        }
        catch (err) {
            console.log('weather history details request fail!');
            throw err;
        }
    };
    
    renderWeatherTable() {
        if (this.props.isLoading)
            return <div>Loading weather query from DB...</div>;
        
        if (this.props.error)
            return <div>Error! {this.props.weather.error}</div>;
        
        if (!this.props.requestCompleted)
            return <div>Unable to make a request</div>;
        
        return (
            <WeatherTable
                weatherData={this.props.weather}
            />
        );
    };
    
    render() {
        if (!this.props.requestCompleted) return <div>Loading</div>;
        return (
            <Container>
                <StyledHeaderMain>
                    User request data
                </StyledHeaderMain>
                <ListGroup>
                    <ListGroupItem>
                        <Label>
                            City: {this.props.weather.city.name}
                        </Label>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Label>
                            Date and time of the request: {this.props.date}
                        </Label>
                    </ListGroupItem>
                </ListGroup>
                {this.renderWeatherTable()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    let date = new Date();
    date.setTime(Date.parse(state.detailsStore.detailsData.request_date));

    return ({
        weather: state.detailsStore.detailsData.weatherList,
        date: date.toLocaleString(),
        error: state.detailsStore.error,
        isLoading: state.detailsStore.isDetailsLoading,
        requestCompleted: state.detailsStore.requestCompleted,
    });
};

export default connect(mapStateToProps, {getWeatherDetails})(HistoryDetails);