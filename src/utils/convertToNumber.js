/**
 * Convert string into Number type (round number, no comma, no period)
 *
 * @param {string} text Text you want to convert
 */
const convertToNumber = text => {
  const numberPattern = /\d+/g
  const getNumbers = text.match(numberPattern)

  // still a string type, and should be a string!
  const allNumbers = getNumbers ? getNumbers.join("") : "0"

  const result = parseInt(allNumbers)

  return result
}

export default convertToNumber
