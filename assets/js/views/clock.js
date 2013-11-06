var app = app || {};
app.Views = app.Views || {};

app.Views.Clock = React.createBackboneClass({

    changeOptions: "change:elapsedPlayTime",

    getInitialState: function() {
        return {secondsElapsed: 0};
    },

    formatClock: function(elapsedSeconds) {
        return "" + (new app.Widgets.Clock(elapsedSeconds));
    },

    render: function() {
        return React.DOM.div({}, 'Time: ' + this.formatClock(this.getModel().get("elapsedPlayTime")));
    }

});
