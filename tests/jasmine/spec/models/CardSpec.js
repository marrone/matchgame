define(["models/card"], function(Card) {

return describe("Tests for Card Model", function() {

    beforeEach(function() {

    });

    afterEach(function() {

    });

    it("Can be created with default values for its attributes.", function() {
        var card = new Card();
        expect(card.get("face")).toBe(0);
        expect(card.get("matched")).toBe(false);
        expect(card.get("faceUp")).toBe(false);
    });

    it("has pre-defined face values for the class", function() {
        expect(Card.FACES).toBeDefined();
    });

    it("Can only contain a face value from those pre-defined and will trigger an invalid event on failed validation.", function() {

        var card = new Card();

        var errorCallback = jasmine.createSpy("-invalid event callback-");

        card.on("invalid", errorCallback);

        card.set({face: "abc"}, {validate: true});

        var errCall = errorCallback.calls.mostRecent();
        expect(errorCallback).toHaveBeenCalled();
        expect(errorCallback.calls.count()).toEqual(1);
        expect(errCall).toBeDefined();
        expect(errCall.args).toBeDefined();
        if(errCall) { 
            expect(errCall.args[0]).toBe(card);
            expect(errCall.args[1]).toBe("Card.face must be a valid FACE constant");
        }

        card.set({face: Card.FACES.BEARDO}, {validate:true});
        expect(errorCallback.calls.count()).toEqual(1);
    });

    it("Can only contain a boolean value for faceUp/matched and will trigger invalid event on failed validate.", function() {
        var card = new Card({face: Card.FACES.REDJAY});
        var errorCallback = jasmine.createSpy("-invalid event callback-");
        card.on("invalid", errorCallback);

        card.set({faceUp: true}, {validate: true});
        expect(errorCallback).not.toHaveBeenCalled();

        card.set({faceUp: 1}, {validate: true});
        expect(errorCallback).toHaveBeenCalled();
        expect(errorCallback.calls.count()).toEqual(1);
        expect(errorCallback.calls.mostRecent()).toBeDefined();
        expect(errorCallback.calls.mostRecent().args[0]).toBe(card);
        expect(errorCallback.calls.mostRecent().args[1]).toBe("Card.faceUp must be a boolean value.");

        card.set({matched: false}, {validate: true});
        expect(errorCallback.calls.count()).toEqual(1);
        card.set({matched: "foo"}, {validate: true});
        expect(errorCallback.calls.count()).toEqual(2);
        expect(errorCallback.calls.mostRecent().args[0]).toBe(card);
        expect(errorCallback.calls.mostRecent().args[1]).toBe("Card.matched must be a boolean value.");
    });

    it("will not match a different face", function() {
        var card = new Card({face: Card.FACES.TOPHAT});
        var card2 = new Card({face: Card.FACES.SHELLY})
        expect(card.matchesFace(card2)).toBe(false);
    });

    it("will match the same face", function() {
        var card = new Card({face: Card.FACES.TOPHAT});
        var card2 = new Card({face: card.get("face")});
        expect(card.matchesFace(card)).toBe(true);
        expect(card.matchesFace(card2)).toBe(true);
    });

    it("reports it is face up when face showing", function() {
        var card = new Card();
        card.set("faceUp", true);
        expect(card.isFaceUp()).toBe(true);
        expect(card.isFaceDown()).toBe(false);
    });

    it("reports it is face down when face is not showing", function() {
        var card = new Card();
        expect(card.isFaceUp()).toBe(false);
        expect(card.isFaceDown()).toBe(true);
        card.set("faceUp", false);
        expect(card.isFaceUp()).toBe(false);
        expect(card.isFaceDown()).toBe(true);
    });

});

});
