var app = app || {};

app.Game = Backbone.Model.extend({

    defaults: function() {
        return {
            cards: null,
            startDate: (new Date()).getTime(),
            endDate: null,
            elapsedPlayTime: 0,
            started: false,
            paused: false,
            finished: false,
            matchedAll: false,
            missCount: 0,
            maxMissesAllowed: 100
        };
    },

    flipOver: function(card) {
        card.set("faceUp", false);
        if(this.pendingFlipOver[card.cid]) {
            clearTimeout(this.pendingFlipOver[card.cid]);
            delete this.pendingFlipOver[card.cid];
        }
    },

    handleMatch: function(cardA, cardB) { 
        cardA.set({matched: true});
        cardB.set({matched: true});
        this.trigger("card:match", cardA, cardB);
        this.currentCard = null;
        // all matched
        if(this.get("cards").filter(function(card) { return !card.get("matched"); }).length === 0) {
            this.set({matchedAll: true, finished: true, endDate: (new Date()).getTime()});
            this.clearClockInterval();
        }
    },

    handleMismatch: function(cardA, cardB) { 
        this.set({missCount: this.get("missCount") + 1});
        this.trigger("card:mismatch", cardA, cardB);
        this.currentCard = null;
        // game over
        if(this.get("missCount") >= this.get("maxMissesAllowed")) {
            this.clearClockInterval();
            this.set({finished: true, endDate: (new Date()).getTime()});
        }
        // flip cards back over and let them take another turn
        else {
            _.each([cardA, cardB], function(card) {
                if(this.pendingFlipOver[card.cid]) {
                    clearTimeout(this.pendingFlipOver[card.cid]);
                }
                this.pendingFlipOver[card.cid] = setTimeout(_.bind(this.flipOver, this, card), 1000);
            }, this);
        }
    },

    onCardFlip: function(card, opts) {
        // only handle when a card is being turned face up
        if(!card.get("faceUp")) {
            return;
        }

        // store the first card select for matching on the second card
        if(!this.currentCard) {
            this.currentCard = card;
            return;
        }

        // same card, do nothing
        if(this.currentCard.cid == card.cid) {
            return;
        }

        // matched
        if(this.currentCard.get("face") == card.get("face")) {
            this.handleMatch(this.currentCard, card);
        }
        // mismatched
        else {
            this.handleMismatch(this.currentCard, card);
        }
    },

    reset: function() {
        if(this.get("cards")) {
            this.stopListening(this.get("cards"));
        }
        this.set({
            startDate: new Date(),
            endDate: null,
            elapsedPlayTime: 0,
            started: false,
            paused: false,
            finished: false,
            matchedAll: false,
            missCount: 0,
            cards: new app.Cards(this.getRandomCards())
        });
        this.pendingFlipOver = {};
        this.currentCard = null;
        this.listenTo(this.get("cards"), "change:faceUp", this.onCardFlip);
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
    },

    hasStarted: function() {
        return this.get("started");
    },

    clearClockInterval: function() {
        if(this.clockInterval) { 
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    },

    setClockInterval: function() {
        this.clearClockInterval();
        this.clockInterval = setInterval(_.bind(this.tick, this), 1000);
    },

    startGame: function() {
        if(!this.hasStarted()) {
            this.set({started: true});
            this.setClockInterval();
        }
    },

    tick: function() {
        if(this.get("finished")) {
            this.clearClockInterval();
        }
        else {
            this.set({elapsedPlayTime: this.get("elapsedPlayTime") + 1});
        }
    },

    isPaused: function() {
        return this.get("paused");
    },

    pauseGame: function() {
        if(!this.isPaused() && this.hasStarted()) {
            this.clearClockInterval();
            this.set({paused: true});
        }
    },

    resumeGame: function() {
        if(this.isPaused()) {
            this.setClockInterval();
            this.set({paused: false});
        }
    }

});
