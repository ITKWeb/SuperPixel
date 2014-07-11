var TAILLE_MAX_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

function Wall(wall) {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('wall');

  this.speed_move_x = 1;
  this.speed_move_y = 1;

  if(wall === undefined) {
    this.x = TAILLE_MAX_WIDTH + 100;
    this.y =  Math.floor((Math.random() * 400));
    this.width = Math.floor((Math.random() * 100) + 50);
    this.height = Math.floor((Math.random() * 300) + 50);
    this.yMove = Math.random() > 0.5 ? 1 : -1;
  } else {
    this.x = wall.x;
    this.y = wall.y;
    this.width = wall.w;
    this.height = wall.h;
    this.yMove = wall.yMove;
  }

  this.htmlElement.style.width = this.width+"px";
  this.htmlElement.style.height = this.height+"px";
  this.htmlElement.style.top = this.y+"px";
  
};

Wall.prototype.start = function start(map) {
  this.map = map;
  map.addChild(this.htmlElement, this);
};

Wall.prototype.loop = function loop() {
  this.x = this.x - this.speed_move_x;
  this.y = this.y - ( this.yMove * this.speed_move_y);
  if(this.x <= (this.width * -1)) {
    this.map.removeChild(this.htmlElement, this);
  }
  if(this.y + this.height >= 500 && this.yMove === -1) {
    this.yMove = this.yMove * -1;
  } else if(this.y < 0) {
    this.yMove = this.yMove * -1;
  }
  this.htmlElement.style.left = this.x + 'px';
  this.htmlElement.style.top = this.y + 'px';
};


Wall.prototype.whereIsTheKitchen = function whereIsTheKitchen() {
  return {
    x : this.x,
    y : this.y,
    w : this.width,
    h : this.height,
    yMove: this.yMove
  };
}
