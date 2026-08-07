import { When, Then } from '@wdio/cucumber-framework'
import SecurePage from '../page-objects/secure.page.js'
import { dataConfig } from '../../dataConfig.js'
import logger from '../../logger.js'
import {
  listNotifications,
  extractOtpFromNotification
} from '../helpers/notify.js'

let email

Then(/^I enter the email address for "(.+)"$/, async (user) => {
  await enterEmailAddress(user)
})

async function enterEmailAddress(user) {
  const userEmailInput = await SecurePage.getinputbyid('user_name')
  await userEmailInput.waitForExist({ timeout: 20000 })

  if (user === 'CEO_Confirmed') {
    email = dataConfig.credentials.confirmedCEO
  } else if (user === 'CEO_Unconfirmed') {
    email = dataConfig.credentials.unconfirmedCEO
  } else if (user === 'CEO_Confirmed_Wales') {
    email = dataConfig.credentials.confirmedWalesCEO
  } else if (user === 'CEO_Unconfirmed_Wales') {
    email = dataConfig.credentials.unconfirmedWalesCEO
  } else if (user === 'HOF_Confirmed') {
    email = dataConfig.credentials.confirmedHOF
  } else if (user === 'HOF_Unconfirmed') {
    email = dataConfig.credentials.unconfirmedHOF
  } else if (user === 'HOF_Confirmed_Wales') {
    email = dataConfig.credentials.confirmedWalesHoF
  } else if (user === 'HOF_Unconfirmed_Wales') {
    email = dataConfig.credentials.unconfirmedWalesHoF
  } else if (user === 'HOW_Confirmed') {
    email = dataConfig.credentials.confirmedHOW
  } else if (user === 'HOW_Unconfirmed') {
    email = dataConfig.credentials.unconfirmedHOW
  } else if (user === 'HOW_Confirmed_Wales') {
    email = dataConfig.credentials.confirmedWalesHOW
  } else if (user === 'HOW_Unconfirmed_Wales') {
    email = dataConfig.credentials.unconfirmedWalesHOW
  } else if (user === 'WO_Unconfirmed') {
    email = dataConfig.credentials.unconfirmedWO
  } else if (user === 'WO_Confirmed') {
    email = dataConfig.credentials.confirmedWO
  } else if (user === 'WO_Unconfirmed_Wales') {
    email = dataConfig.credentials.unconfirmedWalesWO
  } else if (user === 'WO_Confirmed_Wales') {
    email = dataConfig.credentials.confirmedWalesWO
  } else if (user === 'FO_Confirmed') {
    email = dataConfig.credentials.confirmedFO
  } else if (user === 'FO_Unconfirmed') {
    email = dataConfig.credentials.unconfirmedFO
  } else if (user === 'FO_Confirmed_Wales') {
    email = dataConfig.credentials.confirmedWalesFO
  } else if (user === 'FO_Unconfirmed_Wales') {
    email = dataConfig.credentials.unconfirmedWalesFO
  } else if (user === 'ChangeHoFuser') {
    email = dataConfig.credentials.ChangeHoFuser
  } else if (user === 'ChangeFOuser') {
    email = dataConfig.credentials.ChangeFOuser
  } else {
    throw new Error(`No email configured for user: ${user}`)
  }

  global.currentTestEmail = email // ⭐ store email globally

  await userEmailInput.setValue(email)
  logger.info(`Email entered for ${user}: ${email}`)
}

When('I Trigger the OP API using valid cred', { timeout: 60000 }, async () => {
  logger.info('API STEP STARTED')

  const pollIntervalMs = 2000 // check every 2 seconds
  const pollDurationMs = 30000 // poll for up to 30 seconds
  const maxResponses = 20
  const endTime = Date.now() + pollDurationMs

  let allNotifications = []
  const targetEmail = global.currentTestEmail || email

  if (!targetEmail) {
    throw new Error('No email available to poll notifications for')
  }

  while (Date.now() < endTime) {
    try {
      // Use the helper to list notifications
      const responseArray = await listNotifications()

      if (Array.isArray(responseArray) && responseArray.length > 0) {
        // Merge and keep latest
        const sorted = [...responseArray].sort((a, b) => {
          const timeA = new Date(a.created_at || a.completed_at).getTime()
          const timeB = new Date(b.created_at || b.completed_at).getTime()
          return timeB - timeA
        })

        // Keep only latest unique by id
        const accumulator = []
        for (const item of sorted) {
          if (!accumulator.find((n) => n.id === item.id)) accumulator.push(item)
        }

        allNotifications = accumulator.slice(0, maxResponses)

        // If we have at least one notification for the target email, stop early
        if (allNotifications.find((n) => n.email_address === targetEmail)) {
          break
        }
      } else {
        logger.warn('No notifications returned from Notify API on this poll')
      }
    } catch (err) {
      logger.error(
        'Error calling listNotifications helper:',
        err?.message || err
      )
    }

    // wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
  }

  global.apiResponses = allNotifications
  logger.info('Final accumulated notifications (latest first, max 20):')
  global.apiResponses?.forEach((item, i) => {
    logger.info(`${i + 1}.`, item)
  })

  logger.info('STEP FINISHED')
})

Then(
  'I extract the OTP from API response and enter it in UI',
  { timeout: 60000 },
  async () => {
    const targetEmail = global.currentTestEmail || email
    const responses = global.apiResponses || []

    logger.info(`Email extracted is:, ${targetEmail}`)
    logger.info(
      `Response for OTP code is: ${JSON.stringify(responses, null, 2)}`
    )

    if (!targetEmail) {
      throw new Error('No email stored from previous step')
    }

    // Find notification for this email
    const notification = responses.find((n) => n.email_address === targetEmail)

    if (!notification) {
      throw new Error(`No notification found for email ${targetEmail}`)
    }

    // Try to extract OTP using helper (more robust than raw regex on body)
    let otp = extractOtpFromNotification(notification)

    if (!otp) {
      // fallback to searching body for 6 digits
      const body = notification.body || notification.content?.body || ''
      const match = body.match(/\b(\d{6})\b/)
      if (match) otp = match[1]
    }

    if (!otp) {
      throw new Error('OTP code not found in notification')
    }

    logger.info(`Extracted OTP: ${otp}`)

    // Enter OTP in UI
    const otpInput = await SecurePage.getinputbyid('verificationCode')
    await otpInput.waitForExist({ timeout: 20000 })
    await otpInput.setValue(otp)
  }
)
