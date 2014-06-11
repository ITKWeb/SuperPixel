function Map() {
	this.htmlElement = document.createElement('div');
	this.htmlElement.classList.add('map');
};

Map.prototype.start = function start(htmlElement) {

  htmlElement.appendChild(this.htmlElement);

};