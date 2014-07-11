function Game() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('game');
  this.bryanIsInTheKitchen = false;
  this.score = 0;
  this.callbacksOnDead = [];
  this.callbacksGameOver = [];
  this.callbacksOnShareScore = [];
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
    that.fireOnGameOver(that.score);
  });
};

Game.prototype.dead = function dead() {
  this.fireOnDead();
  this.gameOver();
};

Game.prototype.gameOver = function gameOver() {
  console.trace();
  this.bryanIsInTheKitchen = true;
  var gameOverHeadlineView = new Headline("Game over<br />you won " + this.score + " $");
  clearInterval(this.scoreInterval);
  gameOverHeadlineView.start(this.map);
  this.fireOnGameOver();
  var gameOver = document.createElement('div');
  gameOver.classList.add('replayPopup');
  var gameOverButton = document.createElement('div');
  gameOverButton.classList.add('link');
  gameOverButton.innerHTML = 'Replay!';
  gameOver.appendChild(gameOverButton);
  gameOverButton.onclick = function() {
    window.location.reload();
  };
  var gameOverButton = document.createElement('div');
  gameOverButton.classList.add('link');
  gameOverButton.innerHTML = 'Back';
  gameOver.appendChild(gameOverButton);
  gameOverButton.onclick = function() {
    window.location = "index.html";
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

Game.prototype.onDead = function onDead(cb) {
  this.callbacksOnDead.push(cb);
};

Game.prototype.fireOnDead = function fireOnDead() {
  for(var i=0, len=this.callbacksOnDead.length; i<len; i++) {
    this.callbacksOnDead[i]();
  }
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
  window.displayMessages = new DisplayMessages();
  window.displayMessages.start(document.getElementsByTagName('body')[0]);
};

Game.prototype.onShareScore = function onShareScore(cb) {
    //console.log("onShareScore");
    this.callbacksOnShareScore.push(cb)
}

Game.prototype.fireOnShareScore = function fireOnShareScore(score) {
  for(var i=0, len=this.callbacksOnShareScore.length; i<len; i++) {
    this.callbacksOnShareScore[i](score);
  }
};

