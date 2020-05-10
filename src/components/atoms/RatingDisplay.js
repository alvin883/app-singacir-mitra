import React, { Component } from "react"
import { View, Text, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Icon, IconName } from "_c_a_icons"
import { Colors, FontSizes, FontFamily } from "_styles"

const RatingDisplay = ({ size, rating, style, iconStyle, textStyle }) => (
  <View style={{ ...styles.wrapper, ...style }}>
    <Icon
      name={IconName.star}
      style={{ ...styles[`icon_${size}`], ...iconStyle }}
      color={Colors.brandPrimary}
    />
    <Text style={{ ...styles[`rating_${size}`], ...textStyle }}>{rating}</Text>
  </View>
)

RatingDisplay.propTypes = {
  size: PropTypes.oneOf(["small", "normal"]),
  rating: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
}

RatingDisplay.defaultProps = {
  size: "normal",
  rating: 4,
  style: {},
  iconStyle: {},
  textStyle: {},
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  icon_small: {
    width: 16,
    height: 16,
  },
  icon_normal: {
    width: 20,
    height: 20,
  },
  rating_small: {
    marginLeft: 4,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.bold,
    color: Colors.brandPrimary,
  },
  rating_normal: {
    marginLeft: 10,
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.bold,
    color: Colors.brandPrimary,
  },
})

export default RatingDisplay
