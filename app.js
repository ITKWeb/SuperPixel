var WebSocketServer = require('ws').Server, 
  connect = require('connect'),
  wss = new WebSocketServer({port: 8081});

connect().use(connect.static(__dirname)).listen(8080);

var room = {};

var highscore = [];

var send = function send(cmd, message) {
  for(var i=0, len=room[cmd.room].length; i<len; i++) {
    if(room[cmd.room][i].isClose === false) {
      room[cmd.room][i].send(message);
    }
  }
};

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      var cmd = JSON.parse(message);
      if(cmd.method === 'enter') {
        room[cmd.room] = room[cmd.room] || [];
        send(cmd, message);
        room[cmd.room].forEach(function(player) {
        ws.send(JSON.stringify({method: cmd.method, room: cmd.room, opt: player.SPOptionsPlayer}));
        });
        console.log(" players : "+room[cmd.room].length);
        ws.isClose = false;
        if(room[cmd.room].length > 0) {//not first player
            ws.send(JSON.stringify({method: 'notfirst', room: cmd.room}));
        } else {
            ws.send(JSON.stringify({method: 'first', room: cmd.room}));
        }
        ws.SPOptionsPlayer = cmd.opt;
        ws.isDead = false;
        room[cmd.room].push(ws);
        } else if(cmd.method === 'gameover') {
          /* clear highscore when gameover */
          highscore = [];
          send(cmd, message);
          room[cmd.room] = [];
        } else if(cmd.method === 'sharescore'){
          var exist = false;
          for (i=0;i<highscore.length;i++){
            if (highscore[i].id === cmd.opt.id) {
             highscore[i].score = cmd.opt.score 
             exist = true;
             break;
            }
          }
          if (!exist){
            highscore.push({ id: cmd.opt.id, score: cmd.opt.score, color: cmd.opt.color});
          }
          ws.send(JSON.stringify({method: cmd.method, room: cmd.room, opt: {highscore: highscore}}));
        } else if(cmd.method === 'dead'){
          ws.isDead = true;
          var nbAlive = 0;
          var winner;
          for(var nbPlayers=0, len=room[cmd.room].length; nbPlayers<len && nbAlive<2; nbPlayers++) {
            if(room[cmd.room][nbPlayers].isDead === false) {
              nbAlive = nbAlive + 1;
              winner = room[cmd.room][nbPlayers].SPOptionsPlayer;
            }
          }
          if(nbAlive <= 1) {
            highscore = [];
            winner = winner || {playerTag: 'you are solo dude !'};
            send({room: cmd.room}, JSON.stringify({method: 'gameover', room: cmd.room, opt: {winner: winner}}));
            room[cmd.room] = [];
          }
          send(cmd, message);
      } else {
        send(cmd, message);
      }
        //console.log('received: %s', message);
    });
    ws.on('close', function(message) {
      ws.isClose = true;
      var found = false;
      for(var r in room) {
        for(var i=0, len=room[r].length; i<len && found === false; i++) {
        if(room[r][i] === ws) {
          found = true;
          room[r].splice(i, 1);
        }
      }
    }
    });
});
