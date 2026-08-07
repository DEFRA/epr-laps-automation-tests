import axios from 'axios'

const notifyApi = axios.create({
  baseURL: 'https://api.notifications.service.gov.uk',
  headers: {
    // use a GOV.UK Notify API key with appropriate permissions
    Authorization: `Bearer ${process.env.NOTIFY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 10_000
})

/**
 * Query notifications by reference (or other query params).
 * Returns the notifications array from the API response.
 */
export async function listNotifications({ reference, older_than, status } = {}) {
  const params = {}
  if (reference) params.reference = reference
  if (older_than) params.older_than = older_than
  if (status) params.status = status

  const res = await notifyApi.get('/v2/notifications', { params })
  // API returns { notifications: [...] }
  return res.data.notifications || []
}

/**
 * Get a single notification by id.
 * Returns the notification object from the API.
 */
export async function getNotificationById(id) {
  const res = await notifyApi.get(`/v2/notifications/${id}`)
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
  if (notification.content?.body) possibleStrings.push(notification.content.body)
  if (notification.body) possibleStrings.push(notification.body)
  // personalisation object values
  if (notification.personalisation && typeof notification.personalisation === 'object') {
    possibleStrings.push(...Object.values(notification.personalisation).map(String))
  }
  // template fields
  if (notification.template && notification.template.body) possibleStrings.push(notification.template.body)

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
  // optionally fetch full notification if you need more fields:
  const full = await getNotificationById(n.id).catch(() => n)
  return extractOtpFromNotification(full)
}
