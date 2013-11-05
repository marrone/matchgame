var app = app || {};

app.Cards = Backbone.Collection.extend({

    model: app.Card,

    // filter down the list of cards to those that have been matched
    matched: function() {
        return this.filter(function(card) {
            return card.get('matched');
        });
    },

    // filter down the list of cards to those that are still unmatched
    unmatched: function() {
        return this.without.apply(this, this.matched());
    }

});
