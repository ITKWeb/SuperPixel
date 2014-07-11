function DisplayMessages() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('displayMessages');
};

DisplayMessages.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
};

DisplayMessages.prototype.show = function show(message, from, color) {
  var msg = document.createElement('div');
  msg.classList.add('msg');
  msg.innerHTML = '[<span style="color:#'+color+';">'+from+'</span>] ' + message;
  this.htmlElement.appendChild(msg);
};