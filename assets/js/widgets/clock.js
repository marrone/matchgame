define(function() {

function Clock(numSeconds) {
    this.numSeconds = parseInt(numSeconds, 10) || 0;
}
Clock.prototype.toString = function() {
    if(!this.numSeconds) {
        return "0:00";
    }

    var HOURSECONDS = 3600,
        hours = parseInt(this.numSeconds / HOURSECONDS, 10),
        minutes = parseInt(this.numSeconds % HOURSECONDS / 60, 10),
        seconds = this.numSeconds % 60,
        pad = function(n) { return (n < 10 ? "0" : "") + n; };
    return (hours >= 1 ? pad(hours) + ":" + pad(minutes) : minutes) + ":" + pad(seconds);
};

return Clock;

});
