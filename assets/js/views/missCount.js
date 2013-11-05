var app = app || {};
app.Views = app.Views || {};

app.Views.MissCount = React.createBackboneClass({

    changeOptions: "change:missCount change:matchedAll change:finished",

    getInitialState: function() {
        return {};
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
            missesAllowed = model.get("maxMissesAllowed"),
            msg = "";

        if(model.get("finished")) {
            if(model.get("matchedAll")) {
                msg = "Congrats! You Win!";
            }
            else {
                msg = "So sorry, you lost!";
            }
        }
        else {
            msg = 'Misses: ' + this.formatCount(missCount, missesAllowed);
        }

        return React.DOM.div({}, msg);
    }

});
