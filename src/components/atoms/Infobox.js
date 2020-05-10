import React from "react"
import {
  View,
  StyleSheet,
  ColorPropType,
  Text,
  ViewPropTypes,
} from "react-native"
import PropTypes from "prop-types"
import { Icon } from "_c_a_icons"
import Content from "./Content"
import { Colors } from "_styles"
import { hexToRgb } from "_utils"

const Infobox = ({
  style,
  iconStyle,
  textStyle,
  iconName,
  iconColor,
  children,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      {iconName && (
        <Icon
          name={iconName}
          style={{ ...styles.icon, ...iconStyle }}
          color={iconColor}
        />
      )}

      <Content style={{ ...styles.content, ...textStyle }}>{children}</Content>
    </View>
  )
}

Infobox.propTypes = {
  style: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  iconName: PropTypes.string,
  iconColor: ColorPropType,
}

Infobox.defaultProps = {
  iconColor: Colors.brandSecondary,
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: hexToRgb(Colors.brandSecondary, 0.07),
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  content: {
    flexShrink: 1,
    color: Colors.brandSecondary,
  },
})

export default Infobox
