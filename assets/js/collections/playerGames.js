var app = app || {};

app.PlayerGames = Backbone.Collection.extend({

    model: app.PlayerGame,

    localStorage: new Backbone.LocalStorage("memorygame-backbone"),

    comparator: function(playerGameA, playerGameB) {
        var elapsedTimeA = playerGameA.get("elapsedPlayTime") || 0,
            elapsedTimeB = playerGameB.get("elapsedPlayTime") || 0;

        if(elapsedTimeA <= 0 && elapsedTimeB <= 0 || elapsedTimeA == elapsedTimeB) {
            return 0;
        }
        else if(elapsedTimeA < elapsedTimeB) {
            return -1;
        }
        return 1;
    }

});
