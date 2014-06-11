function Pixel() {
	this.htmlElement = document.createElement('div');
	this.htmlElement.classList.add('pixel');
};

Pixel.prototype.start = function start(htmlElement) {

  htmlElement.appendChild(this.htmlElement);

};