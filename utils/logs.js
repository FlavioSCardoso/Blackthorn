const winston = require('winston');
const logConsole = new winston.transports.Console();
const logError = new winston.transports.File({ filename: 'logs/error.log', level: 'error' });


module.exports = {
    logError: winston.createLogger({
        level: 'error',
        format: winston.format.combine(
            winston.format.json(),
        ),
        transports: [
            logError,
            logConsole
        ]
    }),
    logAlert: winston.createLogger({
        level: 'alert',
        format: winston.format.combine(
            winston.format.json(),
        ),
        transports: [
            logError,
            logConsole
        ]
    })
};