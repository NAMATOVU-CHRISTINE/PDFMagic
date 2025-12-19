import fs from 'fs/promises';
import path from 'path';

class Logger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  async ensureLogDirectory() {
    try {
      await fs.access(this.logDir);
    } catch (error) {
      await fs.mkdir(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${level}] ${message} ${metaString}\n`;
  }

  async writeLog(level, message, meta = {}) {
    const logMessage = this.formatMessage(level, message, meta);
    const logFile = path.join(this.logDir, `${level.toLowerCase()}.log`);
    
    try {
      await fs.appendFile(logFile, logMessage);
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  info(message, meta = {}) {
    console.log(`ℹ️  ${message}`, meta);
    this.writeLog('INFO', message, meta);
  }

  error(message, meta = {}) {
    console.error(`❌ ${message}`, meta);
    this.writeLog('ERROR', message, meta);
  }

  warn(message, meta = {}) {
    console.warn(`⚠️  ${message}`, meta);
    this.writeLog('WARN', message, meta);
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🐛 ${message}`, meta);
      this.writeLog('DEBUG', message, meta);
    }
  }

  success(message, meta = {}) {
    console.log(`✅ ${message}`, meta);
    this.writeLog('SUCCESS', message, meta);
  }
}

export const logger = new Logger();