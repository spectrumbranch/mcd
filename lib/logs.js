var zlib = require('zlib');
var fs = require('fs');
var path = require('path');
var async = require('async');
var assert = require('assert');

var internals = {};
internals.paths = {};
internals.paths.patternsFile = __dirname +  '/../scripts/data/patterns.js';
internals.patterns = require(internals.paths.patternsFile).patterns;
var logpath = '/home/minecraft/apoc_minecraft/logs/';

exports.getLogFiles = internals.getLogFiles = function getLogFiles(cb) {
  fs.readdir(logpath, function(direrr,files) {
    cb(direrr, files);
  });
};

exports.isGzipped = internals.isGzipped = function isGzipped(file) {
	return path.extname(file) === '.gz';
};

internals.readLogFile = function(filename, cb) {
	var fullFilePath = logpath + filename;
	fs.readFile(fullFilePath, function(err, data) {
		if (err) throw err;
		
		cb(null, data);
	});
};

internals.readThenGunzip = function readThenGunzip(filename, cb) {
	internals.readLogFile(filename, function(err, data) {
		zlib.gunzip(data, function(gunzipErr, gunzippedData) {
			if (gunzipErr) throw gunzipErr;
			cb(null, gunzippedData);
		});
	});
};

internals.processLogFilesClosure = function(filename) {
	return function(done) {
		if (internals.isGzipped(filename)) {
			internals.readThenGunzip(filename, function(err, gunzipped) {
				internals.processLogFile(gunzipped, filename, function(err1, output) {
					done(null, output);
				});
			});
		} else {
			internals.readLogFile(filename, function(err, data) {
				internals.processLogFile(data, filename, function(err1, output) {
					done(null, output);
				});
			});
		}
	};
};

internals.processLogFile = function(contents, filename, cb) {
	var output = {};
	
	output.filename = filename;
	
	internals.processLogDate(filename, function(err, date) {
		output.date = date.date;
		if (date.timestamp) {
			output.timestamp = date.timestamp;
		}
		var lines = contents.toString().split('\n');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			for (var j = 0; j < internals.patterns.length; j++) {
				var pattern = internals.patterns[j];
				//parse for statement
				var parsedOutput = internals.parseStatement(pattern, line);
				if (parsedOutput != null) {
					if (!output[pattern.name]) {
						output[pattern.name] = [];
					}
					output[pattern.name].push(parsedOutput);
					break;
				}
			}
		}
		
		cb(null, output);
	});
};

internals.processLogDate = function(filename, cb) {
	if (!filename.indexOf('latest')) {
		//need to get the date from last modified
		var fullFilePath = logpath + filename;
		fs.stat(fullFilePath, function(err, stats) {
			cb(null, {date: stats.mtime.toISOString().split('T')[0], timestamp: stats.mtime.toISOString()});
		});
	} else {
		//the date is in the filename. just trim off .log.gz
		var withoutExt = filename.split('.log.gz')[0];
		var splitDashes = withoutExt.split('-');
		var output = {};
		if (splitDashes.length > 3) {
			output.date = splitDashes[0] + '-' + splitDashes[1] + '-' + splitDashes[2];
		} else {
			output.date = withoutExt;
		}
		cb(null, output);
	}
};

internals.processLogFilesParallelClosure = function(input) {
	var fnlist = [];
	
	var total_count = input.length;
	for (var i = 0; i < total_count; i++) {
		var filename = input[i];
		fnlist.push(internals.processLogFilesClosure(filename));
	}
	return fnlist;
};

internals.parseStatement = function(pattern, input) {
	var output = null;
	
	var match = input.match(pattern.pattern);
	if (match != null) {
		output = {};
		output.original = match[0];
		assert(match.length > pattern.output.length);
		for (var i = 0; i < pattern.output.length; i++) {
			var outputKey = pattern.output[i];
			var matchString = match[i + 1];
			if (matchString) {
				var weaponPattern = /\[(.+)\]/;
				if (outputKey === 'actor') {
					var matchWeapon = matchString.match(weaponPattern);
					if (matchWeapon != null) {
						var actor = matchString.split(' ')[0];
						console.log(match[i] + " killed by " + actor + ' with ' + matchWeapon[1] );
						output.weapon = matchWeapon[1];
						output.actor = actor;
					} else {
						output.actor = matchString;
					}
				} else {
					output[outputKey] = matchString;
				}
			}
		}
	}
	return output;
};

exports.parseAllLogs = function(cb) {
	internals.getLogFiles(function(err,files) {
		async.parallel(internals.processLogFilesParallelClosure(files), function(err, results) {
			cb(err, results);
		});
	});
};
