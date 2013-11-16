var app = app || {};
app.Views = app.Views || {};

app.Views.TopScore = Backbone.View.extend({

    template: _.template('<%- title %>'),

    shortenName: function() {
        var maxLen = 20,
            truncString = "...";

        if(name && name.length > maxLen) {
            name = $.trim(name).substring(0, maxLen - truncString.length) + truncString;
        }

        return name;
    },

    getMessage: function() {
        if(!this.model || !this.model.get("elapsedPlayTime")) {
            return "No Top Time Yet";
        }
        var clock = new app.Widgets.Clock(this.model.get("elapsedPlayTime")),
            name = this.shortenName(this.model.get("name"));
        return "Top: " + clock + " by " + name;
    },

    listenToModel: function() {
        if(this.model) { 
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        }
    },

    setFallbackEl: function(el) {
        this.$fallbackEl = $(el);
    },

    initialize: function() {
        this.canvasSupported = false;
        if(this.$el.is("canvas")) {
            if(app.Widgets.CanvasWriter.canvasSupported(this.el)) {
                this.canvasSupported = true;
            }
            else if(this.$fallbackEl) {
                this.$el.remove();
                this.setElement(this.$fallbackEl.show());
            }
        }
        this.listenToModel();
    },

    setModel: function(model) {
        if(this.model) {
            this.stopListening(this.model);
        }
        this.model = model;
        this.listenToModel();
    },

    render: function() {
        var msg = this.getMessage();
        if(this.canvasSupported) { 
            var opts = {textAlign: "start"};
            if(this.$fallbackEl) {
                opts.font = this.$fallbackEl.css("fontSize") + " " + this.$fallbackEl.css("fontFamily");
                opts.fillStyle = this.$fallbackEl.css("color");
            }
            app.Widgets.CanvasWriter.clear(this.el);
            app.Widgets.CanvasWriter.drawTextCentered(this.el, msg, opts);
        }
        this.$el.html(this.template({title: msg}));
        return this;
    }

});
