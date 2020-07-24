import { Logger } from './services/logger';

// Initialize logger
const LOGGER = Logger.getLogger();
Logger.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: process.env.LOG_LEVEL || 'debug'
        }
    }
});

LOGGER.info(`Version: ${process.version}`);
LOGGER.info('Initializing server');

const http = require('http');
const hostname = 'localhost';
const port = 5000;

const app = require('./app');
const server = http.createServer(app).listen(5000); 
server.on('error', function(err: any) {
    LOGGER.error(`ERROR! Couldn't start server, ${err}`);
});
LOGGER.info(`Application started: ${hostname}:${port}`);


