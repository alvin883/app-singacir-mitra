import React from "react"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import { Colors } from "_styles"

const Divider = ({ style }) => (
  <View style={{ ...styles.line, ...style }}></View>
)

Divider.propTypes = {
  style: ViewPropTypes.style,
}

Divider.defaultProps = {
  style: {},
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    marginVertical: 20,
    backgroundColor: Colors.themeBorder,
  },
})

export default Divider
