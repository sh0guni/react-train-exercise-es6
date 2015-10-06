var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment-timezone');

class DepartureDatePicker extends React.Component {
    constructor() {
        super();
        this.state = {departureDate: null};
    }
    handleDateChange = (date) => {
        this.setState({
            departureDate: date
        });
        var formattedDate = moment(date).format("YYYY-MM-DD");
        this.props.handleDateChange(formattedDate);
    }
    render() {
        return (
            <div className="departureDatePicker">
                <DatePicker
                    placeholderText="Click to select a date"
                    dateFormat="DD-MM-YYYY"
                    selected={this.state.departureDate}
                    onChange={this.handleDateChange}
                    />
            </div>
        );
    }
};

module.exports = DepartureDatePicker;
