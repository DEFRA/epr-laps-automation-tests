import axios from 'axios'
import CryptoJS from 'crypto-js'

// === HARD-CODED (temporary) credentials ===
// WARNING: These are sensitive and committing them to source control is insecure.
// You've asked to hard-code them for now; please rotate and move to env vars or a secrets manager ASAP.
const HARDCODED_ISS = '09b1ad42-fd28-4480-9e70-5444ab2ce7a8'
const HARDCODED_SECRET = '8474ea0f-237c-4661-b90f-0d2301969d3f'
// ==========================================

const BASE_URL = 'https://api.notifications.service.gov.uk'

function base64url(source) {
  let encodedSource = CryptoJS.enc.Base64.stringify(source)
  encodedSource = encodedSource.replace(/=+$/, '')
  encodedSource = encodedSource.replace(/\+/g, '-')
  encodedSource = encodedSource.replace(/\//g, '_')
  return encodedSource
}

function createSignedJwt() {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = { iss: HARDCODED_ISS, iat: Math.round(Date.now() / 1000) }

  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  const encodedHeader = base64url(stringifiedHeader)

  const stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  const encodedPayload = base64url(stringifiedPayload)

  const token = `${encodedHeader}.${encodedPayload}`

  let signature = CryptoJS.HmacSHA256(token, HARDCODED_SECRET)
  signature = base64url(signature)

  return `${token}.${signature}`
}

async function getAuthHeader() {
  if (process.env.NOTIFY_API_KEY) {
    return `Bearer ${process.env.NOTIFY_API_KEY}`
  }
  // fallback to signed JWT using hard-coded iss/secret
  return `Bearer ${createSignedJwt()}`
}

/**
 * Query notifications by reference (or other query params).
 * Returns the notifications array from the API response.
 */
export async function listNotifications({ reference, olderThan, status } = {}) {
  const params = {}
  if (reference) params.reference = reference
  if (olderThan) params.older_than = olderThan
  if (status) params.status = status

  const auth = await getAuthHeader()

  const res = await axios.get(`${BASE_URL}/v2/notifications`, {
    params,
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json'
    },
    timeout: 20000,
    validateStatus: () => true
  })
  return res.data.notifications || []
}

/**
 * Get a single notification by id.
 * Returns the notification object from the API.
 */
export async function getNotificationById(id) {
  const auth = await getAuthHeader()
  const res = await axios.get(`${BASE_URL}/v2/notifications/${id}`, {
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json'
    },
    timeout: 10000,
    validateStatus: () => true
  })
  return res.data || res.data.notification || null
}

/**
 * Try to extract an OTP (4-6 digits by default) from notification body or personalisation.
 * Returns the first match or null.
 */
export function extractOtpFromNotification(notification, { digits = 6 } = {}) {
  if (!notification) return null

  const possibleStrings = []

  // common places the message text might be:
  if (notification.content?.body)
    possibleStrings.push(notification.content.body)
  if (notification.body) possibleStrings.push(notification.body)
  // personalisation object values
  if (
    notification.personalisation &&
    typeof notification.personalisation === 'object'
  ) {
    possibleStrings.push(
      ...Object.values(notification.personalisation).map(String)
    )
  }
  // template fields
  if (notification.template && notification.template.body)
    possibleStrings.push(notification.template.body)

  const regex = new RegExp(`\\b(\\d{4,${digits}})\\b`)
  for (const s of possibleStrings) {
    if (!s) continue
    const m = s.match(regex)
    if (m) return m[1]
  }
  return null
}

/**
 * Convenience: find latest notification by reference and return its OTP (if any).
 */
export async function getOtpForReference(reference) {
  const notifications = await listNotifications({ reference })
  if (!notifications || notifications.length === 0) return null

  // pick most recent (API returns most recent first usually)
  const n = notifications[0]
  const full = await getNotificationById(n.id).catch(() => n)
  return extractOtpFromNotification(full)
}
