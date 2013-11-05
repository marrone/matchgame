var app = app || {};

app.Game = Backbone.Model.extend({

    defaults: function() {
        return {
            cards: null,
            startDate: new Date(),
            endDate: null,
            elapsedPlayTime: 0,
            started: false,
            paused: false,
            finished: false,
            matchedAll: false,
            missCount: 0,
            maxMissesAllowed: 10
        };
    },

    reset: function() {
        this.set({
            startDate: new Date(),
            endDate: null,
            elapsedPlayTime: 0,
            started: false,
            paused: false,
            finished: false,
            matchedAll: false,
            missCount: 0,
            cards: this.getRandomCards(16)
        });
    },

    getRandomCards: function(cardCount) {
        var FACES = app.Card.prototype.FACES,
            faceVals = _.keys(FACES),
            deck = _.shuffle(faceVals.concat(faceVals));
        return _.map(deck, function(face) {
            return new app.Card({face: FACES[face]});
        });
    },

    initialize: function() {
        this.reset();
        this.startGame();
    },

    hasStarted: function() {
        return this.get("started");
    },

    clearInterval: function() {
        if(this.interval) { 
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    setInterval: function() {
        this.clearInterval();
        this.interval = setInterval(_.bind(this.tick, this), 1000);
    },

    startGame: function() {
        if(!this.hasStarted()) {
            this.set({started: true});
            this.setInterval();
        }
    },

    tick: function() {
        this.set({elapsedPlayTime: this.get("elapsedPlayTime") + 1});
    },

    isPaused: function() {
        return this.get("paused");
    },

    pauseGame: function() {
        if(!this.isPaused() && this.hasStarted()) {
            this.clearInterval();
            this.set({paused: true});
        }
    },

    resumeGame: function() {
        if(this.isPaused()) {
            this.setInterval();
            this.set({paused: false});
        }
    }

});
