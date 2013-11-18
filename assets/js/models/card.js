define(
["backbone"],
function(Backbone) {

var Card = Backbone.Model.extend({

    FACES: {
        TOPHAT:   1,
        JOKER:    2,
        SHELLY:   3,
        MOLE:     4,
        BLUEJAY:  5,
        BEARDO:   6,
        GHOST:    7,
        REDJAY:   8
    },

    defaults: function() {
        return {
            face: 0,
            matched: false,
            faceUp: false
        };
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

});

return Card;

});
