var winston = require('winston');

const fs = require('fs');
const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
	  
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/ebay.log`,
      timestamp: tsFormat,
      level: 'info'
    })
  ]
});


module.exports.logger = logger;
