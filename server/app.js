var WebSocketServer = require('ws').Server, 
  wss = new WebSocketServer({port: 8080});

var room = {};

var send = function send(cmd, message) {
	for(var i=0, len=room[cmd.room].length; i<len; i++) {
		if(room[cmd.room][i].isClose !== true) {
			room[cmd.room][i].send(message);
		}
	}
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
    	var cmd = JSON.parse(message);
    	if(cmd.method === 'enter') {
    		room[cmd.room] = room[cmd.room] || [];
    		send(cmd, message);
    		room[cmd.room].forEach(function(player) {
    			if(player.isClose !== true) {
    				ws.send(message);
    			}
    		});
    		room[cmd.room].push(ws);
    	} else if(cmd.method === 'move') {
    		send(cmd, message);
    	}
        console.log('received: %s', message);
    });
    ws.on('close', function(message) {
    	ws.isClose = true;
    });
});