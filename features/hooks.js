import { After, AfterAll } from '@cucumber/cucumber'
import { getLogs, clearLogs } from '../logCollector.js'
import allure from '@wdio/allure-reporter'

const featureLogs = {}

After(function () {
  const featureName = this.result
  if (!featureLogs[featureName]) {
    featureLogs[featureName] = []
  }
  featureLogs[featureName].push(getLogs())
  clearLogs()
})

AfterAll(() => {
  for (const featureName in featureLogs) {
    const logs = featureLogs[featureName].join('\n')
    allure.addAttachment(`📄 Logs - ${featureName}`, logs, 'text/plain')
  }
})
