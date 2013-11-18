/** @jsx React.DOM */
define(
["react","react_backbone", "views/card"],
function(React, ReactBackbone, CardView) {

var CardsView = React.createBackboneClass({

    render: function() {
        var listElements = this.getModel().map(function(card) {
            return (CardView( {model:card, card:card}));
        });
        return (
            React.DOM.ul( {className:"cards"},   listElements  )
        );
    }

});

return CardsView;

});
