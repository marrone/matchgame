var app = app || {};

$(function() {
    //new app.AppView();
    $(".card").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("face-up");
    });

    var game = new app.Game();
    var clockView = new app.Views.Clock({model: game});
    React.renderComponent(clockView, $(".game-clock").get(0));

    // debug
    window.game = game;
    window.clockView = clockView;
});

/*
* Models
* ------
* Card:
*   - face : string key
*   - matched: bool
*   - turnedUp: bool
* Game:
*   - cards : collection<Card>
*   - startTime: Date
*   - endTime: Date
*   - paused: bool
*   - finished: bool
*   - won: bool
*   - misses: int
*   - maxMissesAllowed: int
* PlayerGame:
*   - name: string
*   - game: Game
*/

/* React Views usage */
/*
UserView = React.createBackboneClass({
    changeOptions: "change:name", // DEFAULT is "change",
    render: function() {
        return (
            <div>
            <h1>{this.getModel().get("name")}</h1>
            </div>
        );
    }
});
var user = new Backbone.Model();
var userView = UserView({model: user});
*/
