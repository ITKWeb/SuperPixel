var TAILLE_MAX_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

function Wall() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('wall');

  this.x = TAILLE_MAX_WIDTH + 100;
  this.y =  Math.floor((Math.random() * 100));

  this.width = Math.floor((Math.random() * 100) + 50);
  this.height = Math.floor((Math.random() * 300) + 50);

  this.htmlElement.style.width = this.width+"px";
  this.htmlElement.style.height = this.height+"px";
  this.htmlElement.style.top = this.y+"px";
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