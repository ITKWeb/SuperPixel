function Network() {
  this.socket = new WebSocket("ws://"+window.location.hostname+":8081/");
  this.id = Math.random().toString(36).substr(2, 9);
  this.other = {};
  var that = this;
  this.socket.onopen = function(e){
    that.send('enter', 'room', {id: that.id});
    window.game.getPixel().onMove(function(x, y) {
      that.send('move', 'room', {id: that.id, x: x, y: y});
    });
    window.game.onGameOver(function() {
      that.send('gameover', 'room', {id: that.id});
    });
  };
  this.socket.onmessage = function(e) {
    var cmd = JSON.parse(e.data);
    if(cmd.method === 'enter' && cmd.opt.id !== that.id) {
      that.other[cmd.opt.id] = window.game.addOtherPixel();
    } else if(cmd.method === 'move') {
      if(that.other[cmd.opt.id] !== undefined) {
        that.other[cmd.opt.id].MovePixelAss(cmd.opt.x, cmd.opt.y);
      }
    } else if(cmd.method === 'notfirst') {
      console.log('I wait wall !');
      window.game.getMap().clearWalls();
    } else if(cmd.method === 'first') {
      console.log('I am first !');
      window.game.getMap().onWallAdded(function(wall) {
        that.send('newwall', 'room', wall.whereIsTheKitchen());
      });
    } else if(cmd.method === 'newwall') {
      window.game.getMap().addWall(new Wall(cmd.opt));
    } else if(cmd.method === 'gameover') {
      window.game.gameOver();
    }
  };
};

Network.prototype.send = function send(method, room, opt) {
  room = room || 'room';
  this.socket.send(JSON.stringify({method: method, room: room, opt: opt}));
};

new Network();