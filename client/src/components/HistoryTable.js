import React from 'react';
import {
    Table
} from 'reactstrap';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from "prop-types";

const DivFixedStyled = styled.div`
    position: relative;
    height: 50vh;
    overflow: auto;
    display: block;
`;


class HistoryTableRowsCompose extends React.PureComponent {
    render() {
        //return null;
        return (
            <React.Fragment>
                {this.props.data.map((rowElement, i) => (
                    <tr key={i}>
                        <HistoryTableRow rowData={rowElement}/>
                    </tr>
                ))}
            </React.Fragment>
        );
    }
}

HistoryTableRowsCompose.propTypes = {
    data: PropTypes.array.isRequired
};


class HistoryTableRow extends React.PureComponent {
    static renderButtonLink(_id) {
        return (
            <Link to={`/historyDetails/${_id}`}> >> </Link>
        );
    };
    
    render() {
        //return null;
        
        
        return (
            <React.Fragment>
                {this.props.rowData.map((cellElement, i) => {
                    const currentCellData = (i === 2 ? HistoryTableRow.renderButtonLink(cellElement) : cellElement);
                    //console.log('currentCellData: ', currentCellData);
                    return (
                        <td key={i}>
                            <HistoryTableCell cellData={currentCellData}/>
                        </td>
                    );
                })}
            </React.Fragment>
        );
    }
}

HistoryTableRow.propTypes = {
    rowData: PropTypes.array.isRequired
};


class HistoryTableCell extends React.PureComponent {
    render() {
        //return null;
        return (
            <React.Fragment>
                {this.props.cellData}
            </React.Fragment>
        );
    }
}

HistoryTableCell.propTypes = {
    cellData: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).isRequired
};


class WeatherHistoryTableNoRouter extends React.Component {
    weatherRecordsToArray = (weatherRecords) => {
        let arr = [];
        
        //console.log(weatherRecords);
        
        if (weatherRecords !== {})
            for (let currData of weatherRecords) {
                let arrRow = [];
                arrRow.push(currData.weatherList.city.name);
                
                let date = new Date();
                date.setTime(Date.parse(currData.request_date));
                arrRow.push(date.toLocaleString());
                
                arrRow.push(currData._id);
                
                arr.push(arrRow);
                arrRow = [];
            }
        return arr;
    };
    
    
    renderWeatherHistoryTable() {
        if (this.props.isLoading || !this.props.requestCompleted)
            return <div>Loading history...</div>;
        
        if (this.props.error)
            return <div>Error! {this.props.error}</div>;
        
        let weatherHistoryArray = this.weatherRecordsToArray(this.props.weatherRecords);
        
        return (
            <DivFixedStyled>
                <Table dark bordered responsive>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>City</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    <HistoryTableRowsCompose data={weatherHistoryArray}/>
                    </tbody>
                </Table>
            </DivFixedStyled>
        )
    };
    
    render() {
        return this.renderWeatherHistoryTable();
    }
}

const mapStateToProps = (state) => ({
    weatherRecords: state.historyStore.historyData,
    error: state.historyStore.error,
    isLoading: state.historyStore.isHistoryLoading,
    requestCompleted: state.historyStore.requestCompleted,
});

const HistoryTable = withRouter(WeatherHistoryTableNoRouter);

export default connect(mapStateToProps)(HistoryTable);