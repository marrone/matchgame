/** @jsx React.DOM */
var CardsView = React.createBackboneClass({

    render: function() {
        var CardView = app.Views.Card;
        var listElements = this.getModel().map(function(card) {
            return (CardView( {model:card, card:card}));
        });
        return (
            React.DOM.ul( {className:"cards"},   listElements  )
        );
    }

});

var app = app || {};
app.Views = app.Views || {};
app.Views.Cards = CardsView;
