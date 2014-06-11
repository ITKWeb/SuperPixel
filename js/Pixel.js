function Pixel(isHuman) {
	this.htmlElement = document.createElement('div');
	this.htmlElement.id = "superpixel";
	this.htmlElement.classList.add('pixel');
	this.isHuman = isHuman;

	this.callbacksOnMove = [];

	this.MovePixelAss(100,100);
	this.width = 10;
	this.height = 10;

	this.htmlElement.style.width = this.width+"px";
	this.htmlElement.style.height = this.height+"px";

	if(isHuman === false) {
		this.htmlElement.classList.add('noHuman');
	}
};

Pixel.prototype.start = function start(map) {
	var that = this;  
  	map.addChild(this.htmlElement);

  	if(this.isHuman !== false) {

		map.getHtmlElement().onmousemove = function(e) {
		    that.MovePixelAss(e.clientX, e.clientY);
		};
	}
};

Pixel.prototype.MovePixelAss = function move(x,y) {
	this.htmlElement.style.left = x+"px";
	this.htmlElement.style.top = y+"px";
	this.x = x;
	this.y = y;
	this.fireOnMove(x, y);
};

Pixel.prototype.whereIsBryan = function whereIsBryan() {
	return {
		x : this.x,
		y : this.y,
		w : this.width,
		h : this.height
	};
};

Pixel.prototype.onMove = function onMove(cb) {
	this.callbacksOnMove.push(cb);
};

Pixel.prototype.fireOnMove = function fireOnMove(x, y) {
	for(var i=0, len=this.callbacksOnMove.length; i<len; i++) {
		this.callbacksOnMove[i](x, y);
	}
};
