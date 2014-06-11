function Map() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('map');
  this.elementsLoop = [];
};

Map.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  new Wall().start(this);
  var that = this;
  setTimeout(function() {
    new Wall().start(that);
    setTimeout(function() {
      new Wall().start(that);
      setTimeout(function() {
        new Wall().start(that);
      }, 2000);
    }, 2000);
  }, 2000);

};

Map.prototype.loop = function loop(htmlElement) {
  for(var i=0, len=this.elementsLoop.length; i<len; i++) {
    this.elementsLoop[i].loop();
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
    }
  }
  new Wall().start(this);
};