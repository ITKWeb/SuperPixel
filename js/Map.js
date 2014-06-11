function Map() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('map');
  this.elementsLoop = [];
  this.walls = [];
  this.callbacksOnWallAdded = [];
  this.nbLoop = 0;
};

Map.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  this.nbLoop = 0;
  this.checkIntervalAndWall();
};

Map.prototype.checkIntervalAndWall = function() {
  if(this.intervalWall === undefined) {
    var that = this;
    this.intervalWall = setInterval(function() {
      clearInterval(that.intervalWall);
      that.intervalWall = undefined;
      if(Math.random() > 0.8) {
        var gabarit = new Wall().whereIsTheKitchen();
        gabarit.y = 0;
        gabarit.height = 100;
        that.fireOnWallAdded(that.addWall(new Wall(gabarit)));
        gabarit.y = 400;
        gabarit.height = 50;
        that.fireOnWallAdded(that.addWall(new Wall(gabarit)));
        gabarit.y = 80;
        gabarit.height = 100;
        that.fireOnWallAdded(that.addWall(new Wall(gabarit)));
      } else {
        that.fireOnWallAdded(that.addWall(new Wall()));
      }
    }, Math.floor((Math.random() * (5000 - (0.1 * that.nbLoop))) + 500));
  }
};

Map.prototype.addWall = function addWall(wall) {
  wall.start(this);
  this.walls.push(wall);
  return wall;
};

Map.prototype.loop = function loop() {
  this.nbLoop = this.nbLoop + 1;
  for(var i=0, len=this.elementsLoop.length; i<len; i++) {
    if(this.elementsLoop[i] !== undefined) {
      this.elementsLoop[i].loop();
    }
  }
  this.checkIntervalAndWall();
};

Map.prototype.addChild = function addChild(htmlElement, element) {
  this.htmlElement.appendChild(htmlElement);
  if(element !== undefined) {
    this.elementsLoop.push(element);
  }
};

Map.prototype.removeChild = function removeChild(htmlElement, element) {
  this.htmlElement.removeChild(htmlElement);
  for(var i=0, len=this.elementsLoop.length; i<len && element!==undefined; i++) {
    if(this.elementsLoop[i] === element) {
      this.elementsLoop.splice(i, 1);
      element = undefined;
      this.walls.splice(i,1);
    }
  }
};

Map.prototype.getHtmlElement = function getHtmlElement() {
  return this.htmlElement;
};

Map.prototype.getWalls = function getWalls() {
  return this.walls;
};

Map.prototype.clearWalls = function clearWalls() {
  clearInterval(this.intervalWall);
  this.elementsLoop.forEach(function(element) {
    this.htmlElement.removeChild(element);
  });
  this.elementsLoop = [];
  this.walls = [];
};

Map.prototype.onWallAdded = function onWallAdded(cb) {
  this.callbacksOnWallAdded.push(cb);
};

Map.prototype.fireOnWallAdded = function fireOnWallAdded(wall) {
  for(var i=0, len=this.callbacksOnWallAdded.length; i<len; i++) {
    this.callbacksOnWallAdded[i](wall);
  }
};