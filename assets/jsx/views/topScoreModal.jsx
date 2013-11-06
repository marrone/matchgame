/** @jsx React.DOM */
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
            <div className={"md-modal md-effect-7" + (this.state.show ? " md-show" : "")}>
                <div className="md-content">
                    <h3>New Fastest Time!</h3>
                    <div>
                        <p>Boomshakalaka! Enter your name for posterity:</p>
                        <form onSubmit={this.onSave}>
                            <input onChange={this.onNameChange} type="text" className="topcoat-text-input--large" value={this.getModel() && this.getModel().get("name")} />
                            <button className="topcoat-button--cta"> Save </button>
                        </form>
                        <a href="#" onClick={this.onCancel} className="md-close topcoat-button">Close</a>
                    </div>
                </div>
            </div>
        );
    }

});

var app = app || {};
app.Views = app.Views || {};
app.Views.TopScoreModal = TopScoreModalView
