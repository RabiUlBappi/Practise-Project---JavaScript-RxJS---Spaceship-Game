var SHOOTING_SPEED = 15;

function paintHeroShots(heroShots, enemies) {
heroShots.forEach(function(shot, i) {
for (var l=0; l<enemies.length; l++) {
var enemy = enemies[l];
if (!enemy.isDead && collision(shot, enemy)) {
ScoreSubject.onNext(SCORE_INCREASE)
enemy.isDead = true;
shot.x = shot.y = -100;
break;
}
}
shot.y -= SHOOTING_SPEED;
drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
});
}


var playerFiring =  Rx.Observable
					.merge(
						Rx.Observable.fromEvent(canvas, 'click'),
						Rx.Observable.fromEvent(canvas, 'keydown')
							.filter(function(evt) { return evt.keycode === 32; })
					)
					.sample(200)
					.timestamp();

var HeroShots = Rx.Observable
				.combineLatest(
					playerFiring,
					SpaceShip,
					function(shotEvents, spaceShip) {
						return { 
							timestamp: shotEvents.timestamp,
							x: spaceShip.x 
						};
					})
					.distinctUntilChanged(function(shot) { return shot.timestamp; })
					.scan(function(shotArray, shot) {
						shotArray.push({x: shot.x, y: HERO_Y});
						return shotArray;
					}, []);

// function renderScene(actors) {
// 	paintStars(actors.stars);
// 	paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
// 	paintEnemies(actors.enemies);
// 	paintHeroShots(actors.heroShots);
// }

// Rx.Observable.combineLatest(
// 	StarStream, SpaceShip, Enemies, HeroShots,
// 	function(stars, spaceship, enemies, heroShots) {
// 		return {
// 			stars: stars,
// 			spaceship: spaceship,
// 			enemies: enemies,
// 			heroShots: heroShots
// 		};
// 	})
// 	.sample(SPEED)
// 	.subscribe(renderScene);
