var app = app || {};

app.PlayerGame = Backbone.Model.extend({

    defaults: function() {
        return {
            name: "Guest",
            game: null
        };
    }

});
