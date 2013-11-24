define(["models/card", "collections/cards"], function(Card, Cards) {

return describe("Tests for Cards Collection", function() {

    it("Can add Model instances as objects and arrays.", function() {
        var cards = new Cards();
        expect(cards.length).toBe(0);
        cards.add({face: Card.FACES.SHELLY});
        expect(cards.length).toBe(1);
        cards.add([
            {face: Card.FACES.BEARDO},
            {face: Card.FACES.BLUEJAY}
        ]);
        expect(cards.length).toBe(3);
    });

    it("Can filter and return only matched and unmatched cards.", function() {
        var cards = new Cards();
        cards.add({face: Card.FACES.SHELLY, matched: true});
        cards.add({face: Card.FACES.BEARDO, matched: false});
        cards.add([
            {face: Card.FACES.GHOST, matched: true},
            {face: Card.FACES.MOLE, matched: false},
            {face: Card.FACES.JOKER, matched: false}
        ]);
        var matchedCards = cards.matched();
        expect(matchedCards).toBeDefined();
        expect(_.isArray(matchedCards)).toBe(true);
        expect(matchedCards.length).toBe(2);
        expect(_.difference(_.map(matchedCards,function(c){return c.get("face")}), [Card.FACES.SHELLY, Card.FACES.GHOST]).length).toBe(0);

        var unmatchedCards = cards.unmatched();
        expect(unmatchedCards).toBeDefined();
        expect(_.isArray(unmatchedCards)).toBe(true);
        expect(unmatchedCards.length).toBe(3);
        expect(_.difference(_.map(unmatchedCards,function(c){return c.get("face")}), [Card.FACES.BEARDO, Card.FACES.MOLE, Card.FACES.JOKER]).length).toBe(0);
    });

});

});
