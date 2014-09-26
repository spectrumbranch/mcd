var Hapi  = require('hapi');
var fs = require('fs');
var server = new Hapi.Server('mc.spectrumbranch.com', 8123, {});

var lib = require('./lib');
var skins = lib.skins;
skins.init();





var isValidAPIKey = function(input, cb) {
	fs.readFile(__dirname + '/keys/keys.json', function(err, data) {
		if (err) {
			cb(err, false);
		} else {
			var keyjson = JSON.parse(data);
			var isValid = false;
			for (var i = 0; i < keyjson.keys.length; i++) {
				console.log('Comparing ['+keyjson.keys[i].key+'] to ['+input+']');

				if (keyjson.keys[i].key === input) {
					isValid = true;
					break;
				}
			}
			cb(null, isValid);
		}
	});
};

var getWhitelist = function(cb) {
	var showUUID = true;
	fs.readFile('/home/minecraft/apoc_minecraft/whitelist.json', function(err, data) {
		if (err) {
			cb(err, {});
		} else {
			var whitelistjson = JSON.parse(data);
			if (!showUUID) {
				for (var i = 0; i < whitelistjson.length; i++) {
					delete whitelistjson[i]['uuid'];
				}
			}
			cb(null, whitelistjson);
		}
	});
};


server.route([
	{
		method: 'POST',
		path: '/apoc_minecraft/whitelist.json',
		handler: function (request, reply) {
			if (request.payload) {
				console.log('Hit whitelist at ' + new Date().toString() + ' by IP: ' + request.info.remoteAddress);
				var apikey = request.payload.apikey;
				isValidAPIKey(apikey, function(err, isValid) {
					if (isValid) {
						getWhitelist(function(err, whitelist) {
							if (err) {
								reply({ success: false, error: err});
							} else {
								reply({ success: true, whitelist: whitelist });
							}
						});
					} else {
						reply({ success: false });
					}
				});
			}
		}
	},
	{
		method: 'POST',
		path: '/apoc_minecraft/skin.json',
		handler: function (request, reply) {
			if (request.payload && request.payload.apikey && request.payload.uuid) {
				console.log('Hit skins at ' + new Date().toString() + ' by IP: ' + request.info.remoteAddress);
				var apikey = request.payload.apikey;
				isValidAPIKey(apikey, function(err, isValid) {
					if (isValid) {
						skins.getSkinForUUID(request.payload.uuid, function(err1, skin) {
							if (err1 || skin == null) {
								console.log('Unable to retrieve skin');
								reply({ success: false, error: err1 || 'Unable to retrieve skin.' });
							} else {
								reply({ success: true, skin: skin });
							}
						});
					}
				});
			}
		}
	}
]);

server.start();
console.log('Server up at ' + server.info.uri + ' !');
