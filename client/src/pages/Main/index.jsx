import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import {
    Container,
} from 'reactstrap';
import {connect} from 'react-redux';
import {getWeather} from '../../store/thunks/weatherThunks';
import WeatherTable from "../../components/shared/WeatherTable";
import {StyledHeaderMain} from "../../components/shared/StyledHeaders";
import styled from 'styled-components';




class Main extends React.Component {
    StyledAutocomplete = styled(Autocomplete).attrs({
        onPlaceSelected: this.performWeatherRequest,
        types: (['(regions)']),
        componentRestrictions: ({country: "ru"})
    })`
    width: 100%
    marginBottom: 2rem
    marginTop: 1rem`;
    
    
    
    performWeatherRequest = (place) => {
        console.log('Place is set to: ', place);
        try {
            const lat = place.geometry.location.lat();
            const long = place.geometry.location.lng();
            console.log("coords: " + lat + ", " + long);
            this.props.getWeather(lat, long);
            return true;
        }
        catch (err) {
            console.log('weather request fail!');
            throw err;
        }
    };
    
    renderWeatherTable() {
        if (this.props.isLoading)
            return <div>Loading weather from the internet...</div>;
        
        if (this.props.error)
            return <div>Error! {this.props.error}</div>;
        
        if (!this.props.requestCompleted)
            return <div>Go make some request</div>;
        
        return (
            <WeatherTable
                weatherData={this.props.weather}
            />
        );
    };
    
    render() {
        return (
            <Container>
                <StyledHeaderMain>
                    Weather forecast
                </StyledHeaderMain>
                <Autocomplete
                    style={{width: '100%', marginBottom: '2rem', marginTop: '1rem'}}
                    onPlaceSelected={(place) => this.performWeatherRequest(place)}
                    types={['(regions)']}
                    componentRestrictions={{country: "ru"}}
                />
                {/*<this.StyledAutocomplete/>*/}
                {this.renderWeatherTable()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    weather: state.weatherStore.weatherData,
    error: state.weatherStore.error,
    isLoading: state.weatherStore.isLoading,
    requestCompleted: state.weatherStore.requestCompleted,
});

export default connect(mapStateToProps, {getWeather})(Main);