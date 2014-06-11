function Headline(texte) {
	this.htmlElement = document.createElement('div');
	this.htmlElement.classList.add('headline');
	this.htmlElement.classList.add('specialfont');
	this.htmlElement.innerHTML = texte;
};



Headline.prototype.start = function start(map) {
  	map.addChild(this.htmlElement);
};