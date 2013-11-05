var app = app || {};
app.Views = app.Views || {};

app.Views.MissCount = React.createBackboneClass({

    changeOptions: "change:missCount",

    getInitialState: function() {
        return {missCount: 0, maxMissesAllowed:0};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    formatCount: function(missCount, missesAllowed) {
        if(missesAllowed > 0) {
            return missCount + "/" + missesAllowed;
        }
        return missCount;
    },

    render: function() {
        var model = this.getModel(),
            missCount = model.get("missCount"),
            missesAllowed = model.get("maxMissesAllowed");
        return React.DOM.div({}, 'Misses: ' + this.formatCount(missCount, missesAllowed));
    }

});
