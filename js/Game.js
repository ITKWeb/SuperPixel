function Game() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('game');
};

Game.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  this.map = new Map();
  this.map.start(this.htmlElement);
  this.pixel = new Pixel();
  this.pixel.start(this.map);
  this.loop();
};

Game.prototype.loop = function loop() {
  var nb = 0;
  var that = this;
  window.requestAnimFrame(function() {
    that.map.loop();
    that.loop();
  });
};

window.onload = function() {
  var game = new Game();
  game.start(document.getElementsByTagName('body')[0]);
};
