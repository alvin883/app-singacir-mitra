import React, { Component } from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { FontFamily, FontSizes } from "_styles"

const Content = ({ style, numberOfLines, children }) => (
  <Text style={{ ...styles.text, ...style }} numberOfLines={numberOfLines}>
    {children}
  </Text>
)

Content.propTypes = {
  style: Text.propTypes.style,
  numberOfLines: PropTypes.number.isRequired,
}

Content.defaultProps = {
  style: {},
  numberOfLines: 0,
}

const styles = StyleSheet.create({
  text: {
    opacity: 0.8,
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
  },
})

export default Content
