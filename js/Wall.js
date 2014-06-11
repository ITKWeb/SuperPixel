var TAILLE_MAX_WIDTH = 300;

function Wall() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('wall');
  this.htmlElement.style.position = 'absolute';
  this.htmlElement.style.top = 0;
  this.htmlElement.style.width = 100 + 'px';
  this.htmlElement.style.height = 50 + 'px';
  this.htmlElement.style.backgroundColor = 'orange';
  this.x = TAILLE_MAX_WIDTH + 100;
  this.width = 100;
};

Wall.prototype.start = function start(map) {
  this.map = map;
  map.addChild(this.htmlElement, this);
};

Wall.prototype.loop = function loop() {
  this.x = this.x - 1;
  if(this.x === (this.width * -1)) {
    this.map.removeChild(this.htmlElement, this);
  }
  this.htmlElement.style.left = this.x + 'px';
};