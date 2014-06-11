function Network() {
  this.socket = new WebSocket("ws://localhost:8080/");
  var that = this;
  this.socket.onopen = function(e){
    that.socket.send('hello');
  };
  this.socket.onmessage = function(e) {
    console.log(e.data);
  };
};

var network = new Network();