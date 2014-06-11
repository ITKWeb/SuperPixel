function Game() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('game');
  this.bryanIsInTheKitchen = false;
  this.score = 0;
  this.callbacksGameOver = [];
  this.nbPlayer = 1;
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
    that.score = that.score + 1 + (1 * that.pixel.getSoreFactor());
    that.scoreHtmlElement.innerHTML = that.score + '<span>$</span>';
  }, 500);
  htmlElement.appendChild(this.scoreHtmlElement);
  this.nbPlayerHtmlElement = document.createElement('div');
  this.nbPlayerHtmlElement.classList.add('score');
  htmlElement.appendChild(this.nbPlayerHtmlElement);
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
  this.bryanIsInTheKitchen = true;
  this.gameOver = new Headline("Game over, you win " + this.score + " $");
  clearInterval(this.scoreInterval);
  this.gameOver.start(this.map);
  this.fireOnGameOver();
  var gameOver = document.createElement('div');
  gameOver.classList.add('replayPopup');
  var gameOverButton = document.createElement('button');
  gameOverButton.innerHTML = 'Replay!';
  gameOver.appendChild(gameOverButton);
  gameOverButton.onclick = function() {
    window.location.reload();
  };
  setTimeout(function() {
    document.body.appendChild(gameOver);
  }, 2500);
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

Game.prototype.onGameOver = function onWallAdded(cb) {
  this.callbacksGameOver.push(cb);
};

Game.prototype.fireOnGameOver = function fireOnWallAdded() {
  for(var i=0, len=this.callbacksGameOver.length; i<len; i++) {
    this.callbacksGameOver[i]();
  }
};

Game.prototype.nbPlayerPlusPlus = function nbPlayerPlusPlus() {
  this.nbPlayer = this.nbPlayer + 1;
  this.nbPlayerHtmlElement.innerHTML = this.nbPlayer + '<span>players</span>';
};

window.onload = function() {
  window.game = new Game();
  window.game.start(document.getElementsByTagName('body')[0]);
};

