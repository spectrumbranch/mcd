var logs = require('../lib').logs;

logs.parseAllLogs(function(err, parseResults) {
	console.log(JSON.stringify(parseResults));
	
	//console.log(parseResults[0].kills);
});