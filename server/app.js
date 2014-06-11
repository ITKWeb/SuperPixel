var WebSocketServer = require('ws').Server, 
  wss = new WebSocketServer({port: 8080});

var room = {};

var send = function send(cmd, message) {
	for(var i=0, len=room[cmd.room].length; i<len; i++) {
		room[cmd.room][i].send(message);
	}
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
    	var cmd = JSON.parse(message);
    	if(cmd.method === 'enter') {
    		room[cmd.room] = room[cmd.room] || [];
    		send(cmd, message);
    		room[cmd.room].forEach(function(player) {
				ws.send(JSON.stringify({method: cmd.method, room: cmd.room, opt: {id: player.SPUniqueId}}));
    		});
    		ws.SPUniqueId = cmd.opt.id;
    		room[cmd.room].push(ws);
    	} else if(cmd.method === 'move') {
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