import React, { Component } from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { FontSizes, FontFamily } from "_styles"

// This will be hide if there's no text provided
const InputLabel = ({ style, text }) =>
  text ? (
    <Text
      style={{
        ...styles.label,
        ...style,
      }}>
      {text}
    </Text>
  ) : null

InputLabel.propTypes = {
  style: Text.propTypes.style,
  text: PropTypes.string,
}

InputLabel.defaultProps = {
  style: {},
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.bold,
  },
})

export default InputLabel
