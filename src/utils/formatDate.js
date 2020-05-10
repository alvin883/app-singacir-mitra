/**
 * Convert Date / UNIX timestamps to readable value
 *
 * @param {(number | object)} date Whether UNIX type or JavaScript Date object
 * @param {boolean} short Whether with short month name or full month name
 */
const formatDate = (date, short = false, withTime = false) => {
  if (typeof date === "number") {
    // UNIX type
    date = parseInt(date) * 1000
    date = new Date(date)
  }

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  let day = date.getDate().toString()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear().toString()

  let hour = date.getHours().toString()
  let minute = date.getMinutes().toString()

  if (day.length < 2) day = "0" + day
  if (hour.length < 2) hour = "0" + hour
  if (minute.length < 2) minute = "0" + minute

  if (short) month = month.slice(0, 3)

  if (!withTime) {
    return `${day} ${month} ${year}`
  } else {
    return `${day} ${month} ${year} -  ${hour}:${minute}`
  }
}

export default formatDate
