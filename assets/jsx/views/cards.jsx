/** @jsx React.DOM */
define(
["react","react_backbone", "views/card"],
function(React, ReactBackbone, CardView) {

var CardsView = React.createBackboneClass({

    render: function() {
        var game = this.getModel();
        var listElements = game.get("cards").map(function(card) {
            return (<CardView model={card} card={card} game={game}/>);
        });
        return (
            <ul className="cards"> { listElements } </ul>
        );
    }

});

return CardsView;

});
