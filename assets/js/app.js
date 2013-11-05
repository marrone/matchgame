var app = app || {};

$(function() {
    function createGame() { 
        var game = new app.Game(),
            clockView = new app.Views.Clock({model: game}),
            statusView = new app.Views.GameStatus({model: game}),
            navView = new app.Views.Nav({model: game}),
            cardsView = new app.Views.Cards({model: game.get("cards")});

        React.renderComponent(clockView, $(".game-clock").get(0));
        React.renderComponent(statusView, $(".game-status").get(0));
        React.renderComponent(navView, $("#nav").get(0));
        React.renderComponent(cardsView, $("#main").get(0));
        game.once("change:started", function() {
            $("#main").removeClass("loading");
        });

        game.startGame();
        return game;
    }
    Backbone.on("newgame", createGame);
    var game = createGame();
});
