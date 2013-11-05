var app = app || {};

app.Card = Backbone.Model.extend({

    FACES: {
        UNKNOWN:  0,
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
            face: app.Card.prototype.FACES.UNKNOWN,
            matched: false,
            faceUp: false
        };
    }

});
