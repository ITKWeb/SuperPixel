function Pixel(isHuman) {
	this.htmlElement = document.createElement('div');
	this.htmlElement.id = "superpixel";
	this.htmlElement.classList.add('pixel');
	this.isHuman = isHuman;
	if(isHuman === false) {
		this.htmlElement.classList.add('noHuman');
	}
};

Pixel.prototype.start = function start(map) {
	var that = this;  
  	map.addChild(this.htmlElement);

  	if(this.isHuman !== false) {
		map.getHtmlElement().onmousemove = function(e) {
		    that.MovePixelAss(e.clientX,e.clientY);
		};
	}
};

Pixel.prototype.MovePixelAss = function move(x,y) {
	this.htmlElement.style.left = x+"px";
	this.htmlElement.style.top = y+"px";
}