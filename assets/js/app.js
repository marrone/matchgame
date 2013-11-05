var app = app || {};

$(function() {
    //new app.AppView();
    $(".card").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("face-up");
    });
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
*   - finished: bool
*   - won: bool
*   - misses: int
*   - maxMissesAllowed: int
*/
