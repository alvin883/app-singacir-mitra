import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontSizes, FontFamily } from "_styles"

const Circle = ({ number, isActive }) => {
  const activeStyle = { ...styles.circle, ...styles.circleActive }
  const circleStyle = isActive ? activeStyle : styles.circle

  return (
    <View style={circleStyle}>
      <Text style={styles.circleText}>{number}</Text>
    </View>
  )
}

const Circles = ({ total, current }) => {
  const returnCircles = []
  for (let i = 0; i < total; i++) {
    const isActive = i + 1 <= current
    returnCircles.push(<Circle key={i} number={i + 1} isActive={isActive} />)
  }
  return returnCircles
}

const Stepper = ({ total, current }) => {
  const lineActiveWidth = ((current - 1) / (total - 1)) * 100

  return (
    <View style={styles.wrapper}>
      {/* Default Grey Line */}
      <View style={styles.line}></View>
      {/* Active Line */}
      <View
        style={{
          ...styles.line,
          ...styles.lineActive,
          width: lineActiveWidth + "%",
        }}></View>

      {/* Stepper */}
      <View style={styles.stepWrapper}>
        <Circles total={total} current={current} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  line: {
    position: "absolute",
    top: "50%",
    height: 1,
    width: "100%",
    zIndex: 0,
    backgroundColor: Colors.themeInactive,
  },
  lineActive: {
    backgroundColor: Colors.brandPrimary,
  },
  stepWrapper: {
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    height: 20,
    width: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.themeInactive,
  },
  circleActive: {
    backgroundColor: Colors.brandPrimary,
  },
  circleText: {
    fontSize: FontSizes.extraSmall,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
})

export default Stepper
