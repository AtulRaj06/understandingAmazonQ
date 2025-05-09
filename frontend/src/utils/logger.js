import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level based on environment
const level = () => {
  const env = import.meta.env.MODE || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

// Define the format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define which transports to use based on environment
const transports = [
  // Always log to console
  new winston.transports.Console(),
];

// In a browser environment, we can't directly write to files
// So we'll only add file transports when running in Node.js
if (typeof window === 'undefined') {
  // Daily rotate file for all logs
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    })
  );

  // Separate file for error logs
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Create a browser-friendly logger that doesn't attempt file operations
const createBrowserLogger = () => {
  // Simple console logger for browser environments
  return {
    error: (message, meta = {}) => console.error(message, meta),
    warn: (message, meta = {}) => console.warn(message, meta),
    info: (message, meta = {}) => console.info(message, meta),
    http: (message, meta = {}) => console.log(message, meta),
    debug: (message, meta = {}) => console.debug(message, meta),
  };
};

// Export the appropriate logger based on environment
export const logger = typeof window !== 'undefined' ? createBrowserLogger() : logger;