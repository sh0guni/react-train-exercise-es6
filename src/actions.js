var Reflux = require('reflux');
var request = require('superagent');
var emptyTrain = require('./emptyTrain.json');

function fetchTrain(train, callback) {
    var url = 'http://rata.digitraffic.fi/api/v1/schedules/' + train.trainNumber + '?departure_date=' + train.departureDate;
    request.get(url, (err, res) => {
        if (err) throw err;
        var newTrain = res.body.code ? emptyTrain : res.body;
        callback(newTrain);
    });
}

var Actions = Reflux.createActions({
    "trainSearch": {asyncResult: true}
});

Actions.trainSearch.listen(function (train) {
    fetchTrain(train, (newTrain) => {
        Actions.trainSearch.completed(newTrain);
    });
});

module.exports = Actions;
