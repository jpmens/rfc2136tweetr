/*
 * udptweetr.js (C)April 2011, by Jan-Piet Mens <jpmens@gmail.com>
 * launch with
 *	node udptweetr.js
 *
 * node-twitter from https://github.com/jdub/node-twitter
 * dgram code from http://www.robertprice.co.uk/robblog/archive/2011/3/Writing_A_UDP_Server_Using_Node_js.shtml
 */
var sys = require('sys'),
    dgram = require("dgram"),
    twitter = require('twitter');

var twit = new twitter({
	consumer_key: 'YOUR DATA',
	consumer_secret: 'YOUR DATA',
	access_token_key: 'YOUR DATA',
	access_token_secret: 'YOUR DATA',
});

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
	console.log("udp-server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	twit.updateStatus(msg.toString(),
			{ include_entities: false },
			function (data) {
					sys.puts(sys.inspect(data));
				}
			}
		);
});

server.on("listening", function () {
	var address = server.address();
	console.log("server listening " + address.address + ":" + address.port);
});

server.bind(43278, "127.0.0.1");
