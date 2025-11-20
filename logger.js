// logger.js
/* eslint-disable no-console */
class Logger {
  info(message) {
    console.info(`[INFO] ${message}`)
  }

  warn(message) {
    console.warn(`[WARN] ${message}`)
  }

  error(message) {
    console.error(`[ERROR] ${message}`)
  }

  debug(message) {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] ${message}`)
    }
  }
}

export default new Logger()
