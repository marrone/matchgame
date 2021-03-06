/** @jsx React.DOM */
define(
["react","react_backbone"],
function(React) {

var CardView = React.createBackboneClass({

    changeOptions: "change",

    onClick: function(e) {
        e.preventDefault();
        if(!this.props.game.hasStarted() || this.props.game.isPaused()) {
            return;
        }
        if(!this.getModel().get("matched") && !this.getModel().get("faceUp")) { 
            this.getModel().set("faceUp", true);
        }
    },

    render: function() {
        return (
            <li>
                <div className={"card" + (this.getModel().get('faceUp') ? ' face-up' : '') + (this.getModel().get("matched") ? ' matched' : '')} 
                  data-face={"" + this.getModel().get('face')} 
                  onClick={this.onClick}>
                    <div className="card-back"></div>
                    <div className={"card-face card-face-" + this.getModel().get('face')}></div>
                </div>
            </li>
        );
    }

});

return CardView;

});
