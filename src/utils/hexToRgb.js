/**
 *
 * @param {String} hex 6 digits of correct Hex color value
 * @param {Number} [alpha] 0 - 1 alpha value
 */
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")"
  }
}

export default hexToRGB
