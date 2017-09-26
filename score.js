//?????????????//
// Doesn't work//
//?????????????//

function paintScore(score) {
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 26px sans-serif';
ctx.fillText('Score: ' + score, 40, 43);
}

var ScoreSubject = new Rx.Subject();
var score = ScoreSubject.scan(function (prev, cur) {
return prev + cur;
}, 0).concat(Rx.Observable.return(0));

var SCORE_INCREASE = 10;