/** @jsx React.DOM */
define(
["react","react_backbone"],
function(React) {

var CardView = React.createBackboneClass({

    changeOptions: "change",

    onClick: function(e) {
        e.preventDefault();
        if(!this.getModel().get("matched") && !this.getModel().get("faceUp")) { 
            this.getModel().set("faceUp", true);
        }
    },

    render: function() {
        return (
            React.DOM.li(null, 
                React.DOM.div( {className:"card" + (this.getModel().get('faceUp') ? ' face-up' : '') + (this.getModel().get("matched") ? ' matched' : ''), 
                  'data-face':"" + this.getModel().get('face'), 
                  onClick:this.onClick}, 
                    React.DOM.div( {className:"card-back"}),
                    React.DOM.div( {className:"card-face card-face-" + this.getModel().get('face')})
                )
            )
        );
    }

});

return CardView;

});
