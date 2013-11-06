var app = app || {};

app.Widgets.CanvasWriter = function() {

	return {

        /**
        * Determine whether the browser supports canvas
        * Pass a canvas DOM node to verify 2d context support
        *
        * @param HTMLCanvasElement
        *
        * @return bool
        */
		canvasSupported: function(canvasEl) {
			return canvasEl && canvasEl.getContext;

		},

        clear: function(canvasEl) {
            if(this.canvasSupported(canvasEl)) { 
                canvasEl.getContext("2d").clearRect(0, 0, canvasEl.width, canvasEl.height);
            }
        },

        setContextStyles: function(ctx, opts) {
            var config = _.extend({}, {
                    font: "bold 16px sans-serif",
                    fillStyle: "black",
                    textBaseline: "top",
                    textAlign: "left"
                }, opts);

            ctx.fillStyle = config.fillStyle;
            ctx.font = config.font;
            ctx.textBaseline = config.textBaseline;
            ctx.textAlign = config.textAlign;
        },

        /**
        * Draw text onto a canvas element
        *
        * @param string|HTMLCanvasElement canvasEl
        * @param string text
        * @param int x
        * @param int y
        * @param object opts 
        */
        drawText: function(canvasEl, text, x, y, opts) {
			canvasEl = $(canvasEl).get(0);
			if(!canvasEl || !this.canvasSupported(canvasEl)) {
				return false;
			}
            var ctx = canvasEl.getContext('2d');
            this.setContextStyles(ctx, opts);
            ctx.fillText(text, x, y);
        },

        drawTextCentered: function(canvasEl, text, opts) {
			canvasEl = $(canvasEl).get(0);
			if(!canvasEl || !this.canvasSupported(canvasEl)) {
				return false;
			}

            var ctx = canvasEl.getContext('2d');
            this.setContextStyles(ctx, opts);

            var x = parseInt($(canvasEl).width() / 2, 10) - ctx.measureText(text).width / 2 + (opts && opts.offset && opts.offset.x || 0),
                y = 0 + (opts && opts.offset && opts.offset.y || 0);
            return this.drawText(canvasEl, text, x, y, opts);
        }

	};

}();
