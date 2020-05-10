import React from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { FontFamily, FontSizes } from "_styles"

const defaultStyle = StyleSheet.create({
  text: {
    fontFamily: FontFamily.bold,
  },
  size1: {},
  size2: {},
  size3: {},
  size4: {},
  size5: {},
  size6: {
    fontSize: FontSizes.normal,
  },
})

const getStyle = ({ style, size }) => {
  let returnStyle = {
    ...defaultStyle.text,
    ...defaultStyle[`size${size}`],
    ...style,
  }

  return returnStyle
}

/**
 * @deprecated
 * Deprecated, use Text from _atoms instead
 */
const Heading = ({ text, size, style, numberOfLines }) => {
  return (
    <Text
      style={getStyle({ size: size, style: style })}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  )
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "custom"]).isRequired,
  style: Text.propTypes.style,
}

Heading.defaultProps = {
  size: "1",
  numberOfLines: 0,
  style: {},
}

export const HeadingStyle = defaultStyle
export default Heading
