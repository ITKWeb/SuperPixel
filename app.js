var WebSocketServer = require('ws').Server, 
  connect = require('connect'),
  wss = new WebSocketServer({port: 8081});

connect().use(connect.static(__dirname)).listen(8080);

var room = {};

var highscore = [];

var send = function send(cmd, message) {
	for(var i=0, len=room[cmd.room].length; i<len; i++) {
		room[cmd.room][i].send(message);
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
            if(room[cmd.room].length > 0) {//not first player
                ws.send(JSON.stringify({method: 'notfirst', room: cmd.room}));
            } else {
                ws.send(JSON.stringify({method: 'first', room: cmd.room}));
            }
            ws.SPOptionsPlayer = cmd.opt;
    		room[cmd.room].push(ws);
        } else if(cmd.method === 'gameover') {
            /* clear highscore when gameover */
            highscore = [];
            send(cmd, message);
            room[cmd.room] = [];
        } else if(cmd.method === 'sharescore'){
            highscore.push({ id: cmd.opt.id, score: cmd.opt.score, color: cmd.opt.color});
			ws.send(JSON.stringify({method: cmd.method, room: cmd.room, opt: {highscore: highscore}}));
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
