// logCollector.js
const collectedLogs = []

export function addLog(level, message) {
  const logMessage = `[${level.toUpperCase()}] ${message}`
  collectedLogs.push(logMessage)
}

export function getLogs() {
  return collectedLogs.join('\n')
}

export function clearLogs() {
  collectedLogs.length = 0
}
