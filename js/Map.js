function Map() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('map');
  this.elementsLoop = [];
  this.walls = [];
  this.callbacksOnWallAdded = [];
};

Map.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  var that = this;
  this.intervalWall = setInterval(function() {
    that.fireOnWallAdded(that.addWall(new Wall()));
  }, Math.floor((Math.random() * 5000) + 1000));
};

Map.prototype.addWall = function addWall(wall) {
  wall.start(this);
  this.walls.push(wall);
  return wall;
};

Map.prototype.loop = function loop() {
  for(var i=0, len=this.elementsLoop.length; i<len; i++) {
    if(this.elementsLoop[i] !== undefined) {
      this.elementsLoop[i].loop();
    }
  }
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