/** @jsx React.DOM */
define(
["react","react_backbone"],
function(React) {

var TopScoreModalView = React.createBackboneClass({

    getInitialState: function() {
        return {show: false, name: this.getModel() && this.getModel().get("name")};
    },

    hide: function() {
        this.setState({show: false});
    },

    onNameChange: function(e) {
        this.getModel().set("name", e.target.value);
    },

    onSave: function(e) {
        e.preventDefault();
        this.getModel().save();
        this.hide();
    },

    onCancel: function(e) {
        e.preventDefault();
        this.hide();
    },

    render: function() { 
        return (
            React.DOM.div( {className:"md-modal md-effect-7" + (this.state.show ? " md-show" : "")}, 
                React.DOM.div( {className:"md-content"}, 
                    React.DOM.h3(null, "New Fastest Time!"),
                    React.DOM.div(null, 
                        React.DOM.p(null, "Boomshakalaka! Enter your name for posterity:"),
                        React.DOM.form( {onSubmit:this.onSave}, 
                            React.DOM.input( {onChange:this.onNameChange, type:"text", className:"topcoat-text-input--large", value:this.getModel() && this.getModel().get("name")} ),
                            React.DOM.button( {className:"topcoat-button--cta"},  " Save " )
                        ),
                        React.DOM.a( {href:"#", onClick:this.onCancel, className:"md-close topcoat-button"}, "Close")
                    )
                )
            )
        );
    }

});

return TopScoreModalView;

});
