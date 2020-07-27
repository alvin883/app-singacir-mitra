import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { Colors } from "_styles"

const LoadingView = ({ style }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <ActivityIndicator color={Colors.brandPrimary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default LoadingView
