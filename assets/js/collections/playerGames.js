var app = app || {};

app.PlayerGames = Backbone.Collection.extend({

    model: app.PlayerGame,

    localStorage: new Backbone.LocalStorage("memorygame-backbone"),

    comparator: function(playerGame) {
        if(!playerGame.get("game")) {
            return 0;
        }
        return playerGame.get("game").getElapsedPlayTime();
    }

});
