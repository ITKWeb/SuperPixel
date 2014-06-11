function Pixel() {
	this.htmlElement = document.createElement('div');
	this.htmlElement.classList.add('pixel');
};

Pixel.prototype.start = function start(map) {
  map.addChild(this.htmlElement);
};