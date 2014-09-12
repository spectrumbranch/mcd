var uuid = require('node-uuid');
var fs = require('fs');
var keyfile = __dirname + '/../keys/keys.json';


var newUUID = uuid.v4();

fs.exists(keyfile, function (exists) {
	if (exists) {
		fs.readFile(keyfile, function(err, data) {
			if (err) throw err;
			var keyjson = JSON.parse(data);

			keyjson.keys.push({ key: newUUID, timestamp: new Date().toString() });
			fs.writeFile(keyfile, JSON.stringify(keyjson), function (errWrite) {
				if (errWrite) throw err;
				console.log('Added key ' + newUUID + ' successfully!');
			});
		});
	} else {
		var keyjson = { keys: [] };
		keyjson.keys.push({ key: newUUID,  timestamp: new Date().toString() });
		fs.writeFile(keyfile, JSON.stringify(keyjson), function (errWrite) {
			if (errWrite) throw err;
			console.log('Added key ' + newUUID + ' successfully!');
		});
	}
});

