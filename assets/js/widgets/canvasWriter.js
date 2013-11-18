define(
["jquery"],
function($) {

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

        getCanvasEl: function(canvasEl) {
			var el = $(canvasEl).get(0);
			if(el && this.canvasSupported(el)) {
                return el;
			}
        },

        initCtx: function(canvasEl, opts) {
            var el = this.getCanvasEl(canvasEl);
            if(el) { 
                var ctx = el.getContext('2d');
                this.setContextStyles(ctx, opts);
                return ctx;
            }
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
            var ctx = this.initCtx(canvasEl, opts);
            if(ctx) { 
                ctx.fillText(text, x, y);
            }
        },

        drawTextCentered: function(canvasEl, text, opts) {
            var ctx = this.initCtx(canvasEl, opts);
            if(!ctx) {
                return;
            }

            var canvasWidth = parseInt($(canvasEl).width() / 2, 10),
                textWidth = ctx.measureText(text).width / 2,
                offsetX = (opts && opts.offset && opts.offset.x || 0),
                offsetY = (opts && opts.offset && opts.offset.y || 0),
                x = canvasWidth - textWidth + offsetX,
                y = 0 + offsetY;

            return this.drawText(canvasEl, text, x, y, opts);
        }

	};

});
