var app = app || {};

$(function() {
    // load up an existing player games from localstorage
    // we can check for highscores when a game is complete
    var playerGames = new app.PlayerGames();
    playerGames.fetch();

    // remember the user's name input this session 
    // so they don't have to keep re-entering it each time
    // they hit a new high score
    var lastUsedName;

    function createGame() { 
        var game = new app.Game(),
            clockView = new app.Views.Clock({model: game}),
            statusView = new app.Views.GameStatus({model: game}),
            navView = new app.Views.Nav({model: game}),
            cardsView = new app.Views.Cards({model: game.get("cards")}),
            topScoreView = new app.Views.TopScoreModal({model: null});

        // display our views
        React.renderComponent(clockView, $(".game-clock").get(0));
        React.renderComponent(statusView, $(".game-status").get(0));
        React.renderComponent(navView, $("#nav").get(0));
        React.renderComponent(cardsView, $("#main").get(0));
        React.renderComponent(topScoreView, $("#modal-container").get(0));

        // remove main container loading icon once game is ready
        game.once("change:started", function() {
            $("#main").removeClass("loading");
        });

        // if a game is completed successfully, check for highscore
        game.once("change:matchedAll", function() {
            var playerGame = new app.PlayerGame({
                elapsedPlayTime: game.get("elapsedPlayTime"), 
                name: lastUsedName
            });
            playerGames.add(playerGame);

            // check where the game was sorted in the existing list
            // if first in the list, new high score!
            var index = playerGames.indexOf(playerGame);
            if(index === 0) {
                playerGame.on("change:name", function() {
                    lastUsedName = playerGame.get("name");
                });
                topScoreView.setProps({model: playerGame});
                topScoreView.setState({show: true});
            }
        });

        // start 'er up
        game.startGame();
        return game;
    }
    Backbone.on("newgame", createGame);
    var game = createGame();
});
