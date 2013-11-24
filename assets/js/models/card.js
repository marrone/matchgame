define(
["backbone", "underscore"],
function(Backbone, _) {

var Card = Backbone.Model.extend({

    defaults: function() {
        return {
            face: 0,
            matched: false,
            faceUp: false
        };
    },

    validate: function(attrs) {
        if(attrs.hasOwnProperty("face") && !_.contains(_.values(Card.FACES), attrs.face)) {
            return "Card.face must be a valid FACE constant";
        }
    },

    matchesFace: function(card) {
        return card.get("face") == this.get("face");
    },

    isFaceUp: function() {
        return this.get("faceUp");
    },

    isFaceDown: function() {
        return !this.isFaceUp();
    }

}, 
{
    FACES: {
        TOPHAT:   1,
        JOKER:    2,
        SHELLY:   3,
        MOLE:     4,
        BLUEJAY:  5,
        BEARDO:   6,
        GHOST:    7,
        REDJAY:   8
    }
});


return Card;

});
