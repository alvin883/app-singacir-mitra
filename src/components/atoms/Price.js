import React from "react"
import { View, Text, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { convertToCurrency, hexToRgb } from "_utils"
import { FontSizes, FontFamily, Colors } from "_styles"

const Price = ({ price, discount_price, style, priceStyle, discountStyle }) => {
  const isDiscount = typeof discount_price !== "undefined" && discount_price

  return !isDiscount ? (
    <View style={{ ...styles.wrapper, ...style }}>
      <Text style={{ ...styles.price, ...priceStyle }}>
        Rp {convertToCurrency(price)}
      </Text>
    </View>
  ) : (
    <View style={{ ...styles.wrapper, ...style }}>
      <Text
        style={{
          ...styles.price,
          ...priceStyle,
          ...styles.price_disc,
          ...discountStyle,
        }}>
        Rp {convertToCurrency(price)}
      </Text>
      <Text style={{ ...styles.price, ...priceStyle }}>
        Rp {convertToCurrency(discount_price)}
      </Text>
    </View>
  )
}

Price.propTypes = {
  price: PropTypes.number,
  discount_price: PropTypes.number,
  style: ViewPropTypes.style,
  priceStyle: Text.propTypes.style,
  discountStyle: Text.propTypes.style,
}

Price.defaultProps = {
  style: {},
  priceStyle: {},
  discountStyle: {},
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  price: {
    fontSize: FontSizes.small,
    fontFamily: FontFamily.normal,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  price_disc: {
    marginRight: 6,
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
    color: hexToRgb(Colors.textPrimary, 0.3),
  },
})

export default Price
