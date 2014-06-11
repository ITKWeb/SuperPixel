function Map() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('map');
  this.elementsLoop = [];
  this.walls = [];
};

Map.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  var that = this;
  setInterval(function() {
    var wall = new Wall();
    wall.start(that);
    that.walls.push(wall);
  }, Math.floor((Math.random() * 5000) + 1000));

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

Map.prototype.getHtmlElement = function (){
  return this.htmlElement;
}

Map.prototype.getWalls = function (){
  return this.walls;
}