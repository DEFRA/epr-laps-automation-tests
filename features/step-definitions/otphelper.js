import axios from 'axios'
import { When, Then } from '@wdio/cucumber-framework'
// import { expect, browser } from '@wdio/globals'
// import * as path from 'path'
import SecurePage from '../page-objects/secure.page.js'
// import { clickElement, setValue } from './Common.js'
// import LoginPage from '../page-objects/login.page.js'
import { dataConfig } from '../../dataConfig.js'
import logger from '../../logger.js'
// import * as fs from 'fs'
// import allureReporter from '@wdio/allure-reporter'
// import assert from 'assert'
// import { fileURLToPath } from 'url'
// import qs from 'qs'
import crypto from 'crypto'
// import { error } from 'console'
// import * as jwt from 'jsonwebtoken'

// let apiResponse
// let extractedOtp
let email

Then(/^I enter the email address for "(.+)"$/, async (user) => {
  await enterEmailAddress(user)
})

async function enterEmailAddress(user) {
  const userEmailInput = await SecurePage.getinputbyid('user_name')
  await userEmailInput.waitForExist({ timeout: 10000 })

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

/**
 * Base64 URL encode
 */
function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

/**
 * Generate JWT Token (HS256)
 */
function generateToken() {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const payload = {
    iss: dataConfig.clientsecrets.POSTMAN_IDM_CLIENT_ID,
    iat: Math.round(Date.now() / 1000)
  }

  const secret = dataConfig.clientsecrets.POSTMAN_IDM_CLIENT_SECRET
  logger.info(`Client secret is displayed: ${secret}`)

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(payload))

  const token = `${encodedHeader}.${encodedPayload}`
  logger.info(`token is generated: ${token}`)

  const signature = crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${token}.${signature}`
}

/// /  https://api.notifications.service.gov.uk/v2/notifications

When('I Trigger the OP API using valid cred', { timeout: 60000 }, async () => {
  logger.info('API STEP STARTED')

  const pollIntervalMs = 2000 // check every 2 seconds
  const pollDurationMs = 30000 // poll for up to 30 seconds
  const maxResponses = 20 // keep top 20 notifications

  const endTime = Date.now() + pollDurationMs
  let allNotifications = []
  let lastTopCreatedAt = null

  while (Date.now() < endTime) {
    try {
      const token = generateToken()
      logger.info(`Generated token is: ${token}`)
      const response = await axios.get(
        'https://api.notifications.service.gov.uk/v2/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0'
          },
          validateStatus: () => true
        }
      )
      logger.info(`API response status is generated: ${response}`)
      const responseArray = Array.isArray(response.data.notifications)
        ? response.data.notifications
        : []

      if (responseArray.length > 0) {
        // Sort by latest created_at first
        const sortedPoll = [...responseArray].sort((a, b) => {
          const timeA = new Date(a.created_at || a.completed_at).getTime()
          const timeB = new Date(b.created_at || b.completed_at).getTime()
          return timeB - timeA
        })

        // Merge into global accumulator
        sortedPoll.forEach((item) => {
          const index = allNotifications.findIndex((n) => n.id === item.id)
          if (index === -1) {
            allNotifications.push(item)
          } else {
            allNotifications[index] = item // update if changed
          }
        })

        // Sort global list
        allNotifications.sort((a, b) => {
          const timeA = new Date(a.created_at || a.completed_at).getTime()
          const timeB = new Date(b.created_at || b.completed_at).getTime()
          return timeB - timeA
        })

        // Keep only top 20
        allNotifications = allNotifications.slice(0, maxResponses)

        // Stop early if top notification timestamp stabilizes
        const currentTopCreatedAt = allNotifications[0]?.created_at
        if (lastTopCreatedAt && lastTopCreatedAt === currentTopCreatedAt) {
          break // latest notification reached
        }
        lastTopCreatedAt = currentTopCreatedAt

        // Optional: log top 3 notifications of this poll
        logger.info('Top 3 latest notifications from this poll:')
        allNotifications.slice(0, 3).forEach((item, idx) => {
          logger.info(`${idx + 1}.`, item)
        })
      } else {
        logger.warn('No notifications found in this poll.')
      }
    } catch (err) {
      logger.error('API call error:', err.message)
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
  }

  // Store globally for later steps
  global.apiResponses = allNotifications

  // Final sorted log by latest created_at
  logger.info('Final accumulated notifications (latest first, max 20):')
  global.apiResponses.forEach((item, i) => logger.info(`${i + 1}.`, item))

  logger.info('STEP FINISHED')
})

Then(
  'I extract the OTP from API response and enter it in UI',
  { timeout: 60000 },
  async () => {
    const email = global.currentTestEmail
    const responses = global.apiResponses || []

    logger.info('Email extracted is:', email)
    logger.info('Response for OTP code is:', responses)

    if (!email) {
      throw new Error('No email stored from previous step')
    }

    // Find notification for this email
    const notification = responses.find((n) => n.email_address === email)

    if (!notification) {
      throw new Error(`No notification found for email ${email}`)
    }

    const body = notification.body || ''

    // Extract 6 digit code
    // const match = body.match(/#(\d{6})/);
    const match = body.match(/\b(\d{6})\b/)

    if (!match) {
      throw new Error('OTP code not found in notification body')
    }

    const otp = match[1]

    logger.info(`Extracted OTP: ${otp}`)

    // Enter OTP in UI
    const otpInput = await SecurePage.getinputbyid('verificationCode')
    await otpInput.waitForExist({ timeout: 10000 })
    await otpInput.setValue(otp)
  }
)

When(
  'I trigger the OP API and enter the OTP in UI',
  { timeout: 60000 },
  async () => {
    logger.info('API STEP STARTED')

    const email = global.currentTestEmail

    if (!email) {
      throw new Error('No email stored from previous step')
    }

    // const pollIntervalMs = 2000
    const pollDurationMs = 30000
    const endTime = Date.now() + pollDurationMs

    let otp = null

    while (Date.now() < endTime && !otp) {
      try {
        const token = generateToken()

        logger.info(`Generated token: ${token}`)

        const response = await axios.get(
          'https://api.notifications.service.gov.uk/v2/notifications',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0'
            },
            validateStatus: () => true
          }
        )

        const notifications = Array.isArray(response.data.notifications)
          ? response.data.notifications
          : []

        logger.info(
          `Found ${notifications.length} notifications in current poll`
        )

        // Find notification for current email
        const notification = notifications.find(
          (n) => n.email_address === email
        )

        if (notification) {
          logger.info(`Notification found for email: ${email}`)

          const body = notification.body || ''

          const match = body.match(/\b(\d{6})\b/)

          if (match) {
            otp = match[1]
            logger.info(` OTP extracted: ${otp}`)
            break
          }

          logger.warn('Notification found but OTP not present yet')
        } else {
          logger.info(`No notification found for ${email} in this poll`)
        }
      } catch (err) {
        logger.error(`API call error: ${err.message}`)
      }
    }

    if (!otp) {
      throw new Error(
        `OTP not found for email ${email} after ${pollDurationMs / 1000} seconds`
      )
    }

    const otpInput = await SecurePage.getinputbyid('verificationCode')
    await otpInput.waitForExist({ timeout: 10000 })
    await otpInput.setValue(otp)

    logger.info(' OTP entered successfully')
    logger.info('STEP FINISHED')
  }
)
