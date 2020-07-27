const convertToCurrency = (price, decimal = 0, showEmpty = true) => {
  if (!price && showEmpty) {
    return ""
  } else if (!price) {
    return "0"
  }

  let fixedNumber = price.toString()

  if (decimal > 0) {
    fixedNumber = price.toFixed(1).replace(".", ",")
  }

  return fixedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, function(s) {
    return "." + s
  })
}

export default convertToCurrency
