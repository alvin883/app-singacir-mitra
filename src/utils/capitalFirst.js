/**
 * Capitalize the very first lettter of the given string, nice little helper :)
 *
 * @param {string} text String to be converted
 */
const capitalFirst = text => text.charAt(0).toUpperCase() + text.slice(1)

export default capitalFirst
