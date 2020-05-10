/**
 * To get the list(array) of the value from particular object
 *
 * @param {Object} obj object to get the value
 * @returns {Array} extracted values from the object
 * @example
 * const obj = {a: 1, b: 2, c: 3}
 * const keys = getValues(obj)
 *
 * console.log(keys) // return [1, 2, 3]
 */
const getValues = obj => Object.keys(obj).map(item => obj[item])

export default getValues
