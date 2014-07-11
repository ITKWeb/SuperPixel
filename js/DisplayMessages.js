function DisplayMessages() {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('displayMessages');
  this.htmlInputElement = document.createElement('input');
  this.htmlInputElement.type = 'text';
  this.htmlInputElement.classList.add('displayMessagesInput');
  var that = this;
  this.htmlInputElement.onkeydown = function(evt) {
    that.send(evt);
  };
  this.htmlInputElement.placeholder = 'Enter to send';
  this.onSendMessageCb = [];
};

DisplayMessages.prototype.start = function start(htmlElement) {
  htmlElement.appendChild(this.htmlElement);
  htmlElement.appendChild(this.htmlInputElement);
};

DisplayMessages.prototype.show = function show(message, from, color) {
  var msg = document.createElement('div');
  msg.classList.add('msg');
  msg.innerHTML = '[<span style="color:#'+color+';">'+from.substring(0,15)+'</span>] ' + message;
  this.htmlElement.appendChild(msg);
  msg.scrollIntoView();
};

DisplayMessages.prototype.send = function send(evt) {
  if(evt.keyCode === 13) {
    for(var i=0, len=this.onSendMessageCb.length; i<len; i++) {
      this.onSendMessageCb[i](this.htmlInputElement.value);
    }
    this.htmlInputElement.value = '';
  }
};

DisplayMessages.prototype.onSendMessage = function(cb) {
  this.onSendMessageCb.push(cb);
};