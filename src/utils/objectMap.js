// prettier-ignore
/**
 * Array-like map for Object type
 *
 * @param {Object} obj Object to be map
 * @param {Function} fn map function
 * @returns {Object}
 * @link https://stackoverflow.com/a/14810722/6049731
 */
const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export default objectMap
