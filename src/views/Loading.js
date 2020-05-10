import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { Colors } from "_styles"

class Loading extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.brandPrimary} />
      </View>
    )
  }
}

export default Loading
