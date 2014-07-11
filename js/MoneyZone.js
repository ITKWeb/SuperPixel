function MoneyZone(){
	this.htmlElement = document.createElement('div');
  	this.htmlElement.classList.add('moneyZone');
  	this.htmlElement.innerHTML = "<span>BONUS ZONE</span>";
}

MoneyZone.prototype.start = function start(map) {
  	map.addChild(this.htmlElement);
};