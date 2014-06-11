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
  this.titre = new Headline ("START");
  this.titre.start(this.map);
  this.loop();
};

Game.prototype.addOtherPixel = function addOtherPixel() {
  var pixel = new Pixel(false);
  pixel.start(this.map);
  return pixel;
};

Game.prototype.loop = function loop() {
  var nb = 0;
  var that = this;
  window.requestAnimFrame(function() {
    that.collision();
    that.map.loop();
    that.loop();
  });
};



Game.prototype.collision = function collision() {
  var pos = this.pixel.getPosition();
  
};


window.onload = function() {
  window.game = new Game();
  window.game.start(document.getElementsByTagName('body')[0]);
};
