function Network() {
  this.socket = new WebSocket("ws://"+window.location.hostname+":8081/");
  this.id = Math.random().toString(36).substr(2, 9);
  var options = window.location.hash.split('#')[1].split('&');
  var playerTag = options[0];
  var playerColor = options[1];
  this.other = {};
  var that = this;
  this.socket.onopen = function(e){
    that.send('enter', 'room', {id: that.id, playerTag: playerTag, playerColor: playerColor});
    window.displayMessages.show('joined the game', playerTag, playerColor);
    window.game.getPixel().onMove(function(x, y) {
      that.send('move', 'room', {id: that.id, x: x, y: y});
    });
    window.game.onDead(function() {
      that.send('dead', 'room', {id: that.id});
    });
    window.game.onGameOver(function() {
      that.send('gameover', 'room', {id: that.id});
    });
    window.game.onShareScore(function(score){
      that.send('sharescore', 'room', {id: playerTag, score: score, color: playerColor});
    });
    window.displayMessages.onSendMessage(function(message) {
      that.send('message', 'room', {id: that.id, playerTag: playerTag, playerColor: playerColor, message: message});
    });
  };
  this.socket.onmessage = function(e) {
    var cmd = JSON.parse(e.data);
    if(cmd.method === 'enter' && cmd.opt.id !== that.id) {
      that.other[cmd.opt.id] = window.game.addOtherPixel({playerTag: cmd.opt.playerTag, playerColor: cmd.opt.playerColor});
      window.displayMessages.show('joined the game', cmd.opt.playerTag, cmd.opt.playerColor);
      window.game.nbPlayerPlusPlus();
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
      window.game.getMap().levelUp();
    } else if(cmd.method === 'dead' && cmd.opt.id !== that.id) {
      window.displayMessages.show("s'est écrasé dans un mur...", that.other[cmd.opt.id].getTag(), that.other[cmd.opt.id].getColor());
      that.other[cmd.opt.id].yourDead();
    } else if(cmd.method === 'gameover') {
      window.game.gameOver(cmd.opt.winner);
    } else if(cmd.method === 'sharescore') {
      window.game.ShowHighscore(cmd.opt.highscore);
    } else if(cmd.method === 'message') {
      var tag = cmd.opt.id !== that.id ? that.other[cmd.opt.id].getTag() : playerTag;
      var color = cmd.opt.id !== that.id ? that.other[cmd.opt.id].getColor() : playerColor;
      window.displayMessages.show(cmd.opt.message, tag, color);
    }
  };
};

Network.prototype.send = function send(method, room, opt) {
  room = room || 'room';
  this.socket.send(JSON.stringify({method: method, room: room, opt: opt}));
};

new Network();
