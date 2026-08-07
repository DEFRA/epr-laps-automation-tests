import { getOtpForReference } from './notify.js'

async function demo() {
  const reference = process.argv[2] || 'test-reference-123'
  try {
    const otp = await getOtpForReference(reference)
    console.log('Found OTP for reference', reference, ':', otp)
  } catch (err) {
    console.error('Error fetching OTP:', err?.message || err)
    process.exitCode = 2
  }
}

demo()
