/* global jQuery, Backbone, React */
var app = app || {};

(function($, Backbone, React) { 
    "use strict";

    // load up an existing player games from localstorage
    // we can check for highscores when a game is complete
    var playerGames = new app.PlayerGames(),
        lastUsedName;

    // remember the user's name input this session 
    // so they don't have to keep re-entering it each time
    // they hit a new high score

    function createViews(game) {
        return {
            clock: new app.Views.Clock({model: game}),
            status: new app.Views.GameStatus({model: game}),
            nav: new app.Views.Nav({model: game}),
            cards: new app.Views.Cards({model: game.get("cards")}),
            topScoreModal: new app.Views.TopScoreModal({model: null}),
            // this one just a bit different for sake of showing the canvas usage
            topScore: new app.Views.TopScore({el: $("#game-best"), model: playerGames.at(0)})
        };
    }

    function renderViews(views) {
        // display our views
        React.renderComponent(views.clock, $(".game-clock").get(0));
        React.renderComponent(views.status, $(".game-status").get(0));
        React.renderComponent(views.nav, $("#nav").get(0));
        React.renderComponent(views.cards, $("#main").get(0));
        React.renderComponent(views.topScoreModal, $("#modal-container").get(0));
        views.topScore.setFallbackEl($("#game-best-fallback"));
        views.topScore.render();
    }

    function createPlayerGame(game) { 
        var playerGame = new app.PlayerGame({
            elapsedPlayTime: game.get("elapsedPlayTime"), 
            name: lastUsedName
        });
        playerGames.add(playerGame);
        return playerGame;
    }

    function isTopScore(playerGame) {
        var index = playerGames.indexOf(playerGame);
        return index === 0;
    }

    function promptSaveGame(playerGame, views) { 
        playerGame.on("change:name", function() {
            lastUsedName = playerGame.get("name");
        });
        views.topScore.setModel(playerGame);
        views.topScoreModal.setProps({model: playerGame});
        views.topScoreModal.setState({show: true});
    }

    function createGame() { 
        var game = new app.Game();

        var views = createViews(game);
        renderViews(views);

        // remove main container loading icon once game is ready
        game.once("change:started", function() {
            $("#main").removeClass("loading");
        });

        // if a game is completed successfully, check for highscore
        game.once("change:matchedAll", function() {
            var playerGame = createPlayerGame(game);

            // check where the game was sorted in the existing list
            // if first in the list, new high score!
            if(isTopScore(playerGame)) { 
                promptSaveGame(playerGame, views);
            }
        });

        // start 'er up
        game.startGame();
        return game;
    }

    function init() { 
        playerGames.fetch();
        Backbone.on("newgame", createGame);
        createGame();
    }

    $(init);

})(jQuery, Backbone, React);
