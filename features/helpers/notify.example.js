import { getOtpForReference } from './notify.js'
import logger from './logger.js'

async function demo() {
  const reference = process.argv[2] || 'test-reference-123'
  try {
    const otp = await getOtpForReference(reference)
    logger.info('Found OTP for reference', reference, ':', otp)
  } catch (err) {
    logger.error('Error fetching OTP:', err?.message || err)
    process.exitCode = 2
  }
}

demo()
