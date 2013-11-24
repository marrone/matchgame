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
        var errs = _.filter(_.map(["matched","faceUp"], function(attr) {
            if(attrs.hasOwnProperty(attr) && !_.isBoolean(attrs[attr])) {
                return "Card." + attr + " must be a boolean value.";
            }
        }), function(err) { return !!err; });
        if(errs) {
            return errs[0];
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
