/** @jsx React.DOM */
var NavView = React.createBackboneClass({

    changeOptions: "change:paused change:started change:finished",

    onNewGameClick: function(e) {
        e.preventDefault();
        Backbone.trigger("newgame");
    },

    onPauseClick: function(e) {
        e.preventDefault();
        var model = this.getModel();
        if(model.get("started") && !model.get("finished")) { 
            if(model.get("paused")) {
                model.resumeGame();
            }
            else { 
                model.pauseGame();
            }
        }
    },

    render: function() {
        return (
            <div className={this.getModel().get("started") && !this.getModel().get("finished") ? "active" : ""}>
                <button onClick={this.onNewGameClick} className="newgame-btn topcoat-button--cta">
                    New Game
                </button>
                <button onClick={this.onPauseClick} className="pause-btn topcoat-button--cta">
                    {(this.getModel().get("paused") ? "Resume" : "Pause")}
                </button>
            </div>
        );
    }


});

var app = app || {};
app.Views = app.Views || {};
app.Views.Nav = NavView;
