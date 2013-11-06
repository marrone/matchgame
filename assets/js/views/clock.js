var app = app || {};
app.Views = app.Views || {};

app.Views.Clock = React.createBackboneClass({

    changeOptions: "change:elapsedPlayTime",

    getInitialState: function() {
        return {secondsElapsed: 0};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    formatClock: function(elapsedSeconds) {
        if(!elapsedSeconds) {
            return "0:00";
        }

        var HOURSECONDS = 3600,
            hours = parseInt(elapsedSeconds / HOURSECONDS, 10),
            minutes = parseInt(elapsedSeconds % HOURSECONDS / 60, 10),
            seconds = elapsedSeconds % 60,
            pad = function(n) { return (n < 10 ? "0" : "") + n; };
        return (hours >= 1 ? pad(hours) + ":" + pad(minutes) : minutes) + ":" + pad(seconds);
    },

    render: function() {
        return React.DOM.div({}, 'Time: ' + this.formatClock(this.getModel().get("elapsedPlayTime")));
    }

});
