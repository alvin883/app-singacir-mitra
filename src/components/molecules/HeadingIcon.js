import React from "react"
import { View, Text, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { FontFamily, FontSizes, Colors } from "_styles"
import { hexToRgb } from "_utils"
import { Icon } from "_c_a_icons"

const HeadingIcon = ({ iconName, text, style, textStyle }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Icon name={iconName} color={Colors.textPrimary} style={styles.icon} />
      <Text style={{ ...styles.text, ...textStyle }}>{text}</Text>
    </View>
  )
}

HeadingIcon.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
}

HeadingIcon.defaultProps = {
  style: {},
  textStyle: {},
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  text: {
    marginLeft: 14,
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
})

export default HeadingIcon
