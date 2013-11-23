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
