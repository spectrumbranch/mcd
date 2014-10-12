exports.init = function() {
  var CronJob = require('cron').CronJob;

  var job = new CronJob('00 00 4 * * *', function(){
      // Runs every day at 4:00:00 AM.
      var fs = require('fs');
      var logs = require('../lib').logs;
      var outputLocation = __dirname + '/../output/parsedLogs.json';
      logs.parseAllLogs(function(err, parseResults) {
        fs.writeFile(outputLocation, JSON.stringify(parseResults), function(    err) {
           if (err) {
             console.log(err);
           }
         });
      });
    }, function () {
      // This function is executed when the job stops
    },
    true, /* Start the job right now */
    "America/New_York" /* Time zone of this job. */
  );
}
