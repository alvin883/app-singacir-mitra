/**
 * To get the list(array) of the key from particular object
 *
 * @param {Object} obj object to get the value
 * @returns {Array} extracted keys from the object
 * @example
 * const obj = {a: 1, b: 2, c: 3}
 * const keys = getKeys(obj)
 *
 * console.log(keys) // return [a, b, c]
 */
const getKeys = obj => Object.keys(obj)

export default getKeys
