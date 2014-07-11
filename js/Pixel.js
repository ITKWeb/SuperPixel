function Pixel(isHuman, options) {
	if(options === undefined) {
		var options = window.location.hash.split('#')[1].split('&');
	  	var playerTag = options[0];
	  	var playerColor = options[1];
	  	this.options = {playerTag: playerTag, playerColor: playerColor};
	} else {
		this.options = options;
	}
	this.htmlElement = document.createElement('div');
	this.htmlElement.id = "superpixel";
	this.htmlElement.classList.add('pixel');

	slip = document.createElement('div');
	slip.classList.add('pixelSlip');
	slip.style.borderColor = "#"+this.options.playerColor;
	this.htmlElement.appendChild(slip);

	tag = document.createElement('div');
	tag.innerHTML = this.options.playerTag;
	tag.classList.add('pixelTag');
	tag.style.color = "#"+this.options.playerColor;
	this.htmlElement.appendChild(tag);

	this.isHuman = isHuman;

	this.callbacksOnMove = [];

	this.MovePixelAss(100,100);
	this.width = 10;
	this.height = 10;

	this.htmlElement.style.width = this.width+"px";
	this.htmlElement.style.height = this.height+"px";

	this.scoreFactor = 0;

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
	if(this.x > TAILLE_MAX_WIDTH - 50) {
		this.scoreFactor = 2;
	} else {
		this.scoreFactor = 0;
	}
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

Pixel.prototype.getSoreFactor = function getSoreFactor() {
	return this.scoreFactor;
};

Pixel.prototype.getColor = function getSoreFactor() {
	return this.options.playerColor;
};

Pixel.prototype.getTag = function getSoreFactor() {
	return this.options.playerTag;
};

Pixel.prototype.yourDead = function() {
	this.htmlElement.classList.add('dead');
};