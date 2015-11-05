var React = require('react');
var DepartureDatePicker = require('./departure-datepicker.jsx');
var Actions = require('./actions');
var trainStore = require('./store');
var emptyTrain = require('./emptyTrain.json');
var parseTime = require('./time-parser');

class SearchBox extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        var trainNumber = this.state.trainNumber;
        var departureDate = this.state.departureDate;
        if (!trainNumber || !departureDate) {
            return;
        }
        Actions.trainSearch({trainNumber: trainNumber, departureDate: departureDate});
    }
    handleDateChange = (date) => this.setState({ departureDate: date });
    handleTrainNumberChange = (event) => this.setState({trainNumber: event.target.value});
    render() {
        return (
            <div className="searchBox">
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    Train number:<br/>
                    <input type="text" onChange={this.handleTrainNumberChange}/>
                    <br/>
                    Departure date:<br/>
                    <DepartureDatePicker handleDateChange={this.handleDateChange} />
                    <input type="submit" value="Search" /><br/>
                    <br/>
                </form>
            </div>
        );
    }
};

class TrainInfo extends React.Component {
    render() {
        return (
            <div className="trainInfo">
                Train number: {this.props.data.trainNumber}
                <br/>Departure date: {this.props.data.departureDate}
            </div>
        );
    }
};

class TimeTableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.stationShortCode}</td>
                <td>{this.props.data.type}</td>
                <td>{parseTime(this.props.data.scheduledTime)}</td>
            </tr>
        );
    }
};

class TimeTableRows extends React.Component {
    render() {
        var timeTableRows = this.props.data.map(function(ttr, id) {
            return (
                <TimeTableRow key={id} data={ttr} />
            )
        });
        return (
            <div className="timeTableRows">
                Time table:
                <table textAlign='left'>
                    <thead>
                    <tr>
                        <th>Station</th>
                        <th>Type</th>
                        <th>Scheduled time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {timeTableRows}
                    </tbody>
                </table>
            </div>
        )
    }
};

class ScheduleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { train: emptyTrain };
    }
    componentDidMount() {
        this.unsubscribe = trainStore.listen((t) => this.setState({train: t}));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div className="ScheduleTable">
                <TrainInfo data={this.state.train} />
                <TimeTableRows data={this.state.train.timeTableRows} />
            </div>
        );
    }
};

class TrainSearch extends React.Component {
    render() {
        return (
            <div className="TrainSearchApp">
                <SearchBox />
                <ScheduleTable />
            </div>
        );
    }
};

module.exports = TrainSearch;
