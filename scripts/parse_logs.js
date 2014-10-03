var fs = require('fs');
var logs = require('../lib').logs;
var outputLocation = __dirname + '/../output/parsedLogs.json';
logs.parseAllLogs(function(err, parseResults) {
	//console.log(JSON.stringify(parseResults));
	fs.writeFile(outputLocation, JSON.stringify(parseResults), function(err) {
		if (err) {
			console.log(err);
		}
	});
	//console.log(parseResults[0].kills);
});