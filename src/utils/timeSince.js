import formatDate from "./formatDate"
import dateToUnix from "./dateToUnix"

/**
 * Convert UNIX time to `$time since $measurement` string format
 * for example:
 * 3 seconds ago
 * 10 minutes ago
 *
 * @param {number} date UNIX timestamp
 */
const timeSince = date => {
  const now = dateToUnix(new Date())
  const seconds = now - date
  const defaultFormat = formatDate(date)

  let interval

  // To day
  interval = Math.floor(seconds / 86400)

  if (interval > 0) {
    // A day
    return defaultFormat
  }

  interval = Math.floor(seconds / 3600)
  if (interval > 0) {
    // Hour
    return interval + " jam yang lalu"
  }

  interval = Math.floor(seconds / 60)
  if (interval > 0) {
    // Minutes
    return interval + " menit yang lalu"
  }

  // Seconds
  return "baru saja"
}

export default timeSince
