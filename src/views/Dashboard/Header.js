import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
} from "react-native"
import { Colors, Spaces, FontFamily, FontSizes } from "_styles"
import { Avatar } from "_atoms"
import { useSelector } from "react-redux"
import { navigationServices } from "_utils"

const Header = ({ style }) => {
  const username = useSelector(state => state.authReducer.username)

  return (
    <View style={{ ...styles.box, ...style }}>
      <Text style={styles.brand}>Si Ngacir RezekiKu</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigationServices.Navigate("profile")}>
        <Avatar name={username ? username : "  "} />
      </TouchableOpacity>
    </View>
  )
}

Header.propTypes = {
  style: ViewPropTypes.style,
}

Header.defaultProps = {
  style: {},
}

const styles = StyleSheet.create({
  box: {
    minHeight: 67,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    paddingVertical: 16,
    paddingHorizontal: Spaces.container,
    backgroundColor: Colors.brandPrimary,
  },
  brand: {
    color: Colors.themeLight,
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.normal,
  },
})

export default Header
