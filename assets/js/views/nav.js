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
            React.DOM.div( {className:this.getModel().get("started") && !this.getModel().get("finished") ? "active" : ""}, 
                React.DOM.button( {onClick:this.onNewGameClick, className:"newgame-btn topcoat-button--cta"}, 
" New Game "                ),
                React.DOM.button( {onClick:this.onPauseClick, className:"pause-btn topcoat-button--cta"}, 
                    (this.getModel().get("paused") ? "Resume" : "Pause")
                )
            )
        );
    }


});

var app = app || {};
app.Views = app.Views || {};
app.Views.Nav = NavView;
