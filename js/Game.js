function Game() {

};

Game.prototype.start = function start() {

	this.loop();

};

Game.prototype.loop = function loop() {

	var nb = 0;
	var that = this;
	window.requestAnimFrame(function() {
		console.log(nb);
		that.loop();
	});

};

var game = new Game();

game.start();