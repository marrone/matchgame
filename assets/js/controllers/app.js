require([
    "jquery", 
    "backbone", 
    "react",
    "models/game",
    "models/playerGame",
    "collections/playerGames",
    "views/clock",
    "views/gameStatus",
    "views/nav",
    "views/cards",
    "views/topScoreModal",
    "views/topScore"
], 
function(
    $, 
    Backbone, 
    React, 
    Game, 
    PlayerGame, 
    PlayerGames, 
    ClockView, 
    GameStatusView, 
    NavView, 
    CardsView, 
    TopScoreModalView, 
    TopScoreView
) {
    "use strict";

    // load up an existing player games from localstorage
    // we can check for highscores when a game is complete
    var playerGames = new PlayerGames(),
        lastUsedName;

    // remember the user's name input this session 
    // so they don't have to keep re-entering it each time
    // they hit a new high score

    function createViews(game) {
        return {
            clock: new ClockView({model: game}),
            status: new GameStatusView({model: game}),
            nav: new NavView({model: game}),
            cards: new CardsView({model: game.get("cards")}),
            topScoreModal: new TopScoreModalView({model: null}),
            // this one just a bit different for sake of showing the canvas usage
            topScore: new TopScoreView({el: $("#game-best"), model: playerGames.at(0)})
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
        var playerGame = new PlayerGame({
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
        var game = new Game();

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

});
