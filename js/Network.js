function Network() {
  this.socket = new WebSocket("ws://localhost:8080/");
  var that = this;
  this.socket.onopen = function(e){
    that.send('enter', 'room');
  };
  this.socket.onmessage = function(e) {
    var cmd = JSON.parse(e.data);
    console.log(cmd);
    if(cmd.method === 'enter') {
      window.game.addOtherPixel();
    } else if(cmd === 'move') {
      window.alert('move');
    }
  };
};

Network.prototype.send = function send(method, room) {
  room = room || 'room';
  this.socket.send(JSON.stringify({method: method, room: room}));
};

new Network();