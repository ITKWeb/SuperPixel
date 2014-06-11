function Game() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('game');
  this.bryanIsInTheKitchen = false;
  this.score = 0;
};

Game.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  this.map = new Map();
  this.map.start(this.htmlElement);
  this.pixel = new Pixel();
  this.pixel.start(this.map);
  this.titre = new Headline ("START");
  this.titre.start(this.map);
  this.score = 0;
  this.loop();
  var that = this;
  this.scoreHtmlElement = document.createElement('div');
  this.scoreHtmlElement.classList.add('score');
  this.scoreInterval = setInterval(function() {
    that.score = that.score + 1;
    that.scoreHtmlElement.innerHTML = that.score + ' $';
  }, 1000);
  htmlElement.appendChild(this.scoreHtmlElement);
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
    if(!that.bryanIsInTheKitchen){
      that.loop();
    }else{
      that.gameOver();
    }
  });
};

Game.prototype.gameOver = function gameOver() {
  this.gameOver = new Headline("Game over, you win " + this.score + " $");
  clearInterval(this.scoreInterval);
  this.gameOver.start(this.map);
};

Game.prototype.collision = function collision() {
  var bryan = this.pixel.whereIsBryan();
  var kitchens = this.map.getWalls();
  for (var i = kitchens.length - 1; i >= 0; i--) {
    
    var kitchen = kitchens[i].whereIsTheKitchen();
    if(
        (bryan.x+bryan.w) > kitchen.x
        && bryan.x < (kitchen.x+kitchen.w)
        && (bryan.y+bryan.h) > kitchen.y
        && bryan.y < (kitchen.y+kitchen.h)
      ){
      //console.log("GAME OVER");
      this.bryanIsInTheKitchen = true;
    }
  };
};

Game.prototype.getPixel = function getPixel() {
  return this.pixel;
};

Game.prototype.getMap = function getMap() {
  return this.map;
};

window.onload = function() {
  window.game = new Game();
  window.game.start(document.getElementsByTagName('body')[0]);
};
