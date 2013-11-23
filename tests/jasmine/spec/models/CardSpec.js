define(["models/card"], function(Card) {

describe("Tests for Card Model", function() {

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

});

});
