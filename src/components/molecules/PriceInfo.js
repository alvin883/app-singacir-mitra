import React, { Component } from "react"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Text } from "_atoms"
import { Spaces, Colors } from "_styles"

const PriceInfo = ({ title, value, style, emphasize }) => {
  const titleStyle = emphasize
    ? { ...styles.title, ...styles.titleEmphasize }
    : styles.title
  const valueStyle = emphasize
    ? { ...styles.value, ...styles.valueEphasize }
    : styles.value
  const titleWeight = emphasize ? "bold" : "normal"
  const textSize = emphasize ? "medium" : "normal"

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Text style={titleStyle} size={textSize} weight={titleWeight}>
        {title}
      </Text>
      <Text style={valueStyle} size={textSize} weight="bold">
        {value}
      </Text>
    </View>
  )
}

PriceInfo.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  style: ViewPropTypes.style,
  emphasize: PropTypes.bool,
}

PriceInfo.defaultProps = {
  style: {},
  emphasize: false,
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginHorizontal: Spaces.container,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {},
  value: {},
  titleEmphasize: {},
  valueEphasize: {
    color: Colors.brandPrimary,
  },
})

export default PriceInfo
