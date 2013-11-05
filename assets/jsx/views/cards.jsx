/** @jsx React.DOM */
var CardsView = React.createBackboneClass({

    render: function() {
        var CardView = app.Views.Card;
        var listElements = _.map(this.props.cards, function(card) {
            return (<CardView model={card} />);
        });
        return (
            <ul className="cards"> { listElements } </ul>
        );
    }

});

var app = app || {};
app.Views = app.Views || {};
app.Views.Cards = CardsView;
