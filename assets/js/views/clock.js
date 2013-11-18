define(
["react", "react_backbone", "widgets/clock"],
function(React, ReactBackbone, Clock) {

var ClockView = React.createBackboneClass({

    changeOptions: "change:elapsedPlayTime",

    getInitialState: function() {
        return {secondsElapsed: 0};
    },

    formatClock: function(elapsedSeconds) {
        return "" + (new Clock(elapsedSeconds));
    },

    render: function() {
        return React.DOM.div({}, 'Time: ' + this.formatClock(this.getModel().get("elapsedPlayTime")));
    }

});

return ClockView;

});
