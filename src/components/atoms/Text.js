import React from "react"
import { Text as RNText, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { FontFamily, FontSizes, Colors } from "_styles"
import { getKeys } from "_utils"

const Text = ({ style, children, weight, size, numberOfLines }) => (
  <RNText
    style={{
      ...styles.text,
      ...style,

      /**
       * Why use object spreading instead of write it direclty? To make it
       * editable through the `style` props, otherwise it will make error
       * because they will have 2 static key in the same object
       */
      ...{ fontFamily: FontFamily[weight], fontSize: FontSizes[size] },
    }}
    numberOfLines={numberOfLines}>
    {children}
  </RNText>
)

Text.propTypes = {
  style: RNText.propTypes.style,
  weight: PropTypes.oneOf(getKeys(FontFamily)).isRequired,
  size: PropTypes.oneOf(getKeys(FontSizes)).isRequired,
  numberOfLines: PropTypes.number,
}

Text.defaultProps = {
  style: {},
  weight: "normal",
  size: "normal",
  numberOfLines: 0,
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    color: Colors.textPrimary,
  },
})

export default Text
