define(
["backbone"],
function(Backbone) {

var PlayerGame = Backbone.Model.extend({

    defaults: function() {
        return {
            name: "Guest",
            elapsedPlayTime: 0
        };
    }

});

return PlayerGame;

});
