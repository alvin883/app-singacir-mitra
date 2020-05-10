import PropTypes from "prop-types"
import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native"
import { Icon, IconName } from "_c_a_icons"
import { Colors, Spaces } from "_styles"

const Checkbox = ({
  style,
  boxStyle,
  contentStyle,
  children,
  onPress,
  checked,
  clickableChildren,
}) => {
  const TheChildren = () => (
    <View style={{ ...styles.content, ...contentStyle }}>{children}</View>
  )

  const TheBox = () =>
    checked ? (
      <View
        style={{
          ...styles.box,
          ...styles.boxChecked,
          ...boxStyle,
        }}>
        <Icon
          name={IconName.check}
          style={styles.icon}
          color={Colors.themeLight}
        />
      </View>
    ) : (
      <View style={{ ...styles.box, ...boxStyle }} />
    )

  if (clickableChildren) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={1}>
        <View style={{ ...styles.wrapper, ...style }}>
          <TheBox />
          <TheChildren />
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={{ ...styles.wrapper, ...style }}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={1}>
          <TheBox />
        </TouchableOpacity>
        <TheChildren />
      </View>
    )
  }
}

Checkbox.propTypes = {
  style: ViewPropTypes.style,
  boxStyle: ViewPropTypes.style,
  contentStyle: Text.propTypes.style,
  onPress: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  clickableChildren: PropTypes.bool,
}

Checkbox.defaultProps = {
  style: {},
  boxStyle: {},
  contentStyle: {},
  onPress: () => {},
  checked: false,
  clickableChildren: true,
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  button: {
    // backgroundColor: "red",
    paddingLeft: Spaces.container,
  },
  box: {
    height: 20,
    width: 20,
    marginRight: 14,
    borderWidth: 2,
    borderColor: Colors.brandPrimary,
    borderStyle: "solid",
    borderRadius: 4,
  },
  boxChecked: {
    backgroundColor: Colors.brandPrimary,
  },
  icon: {
    width: 16,
    height: 16,
    // backgroundColor: "red",
  },
  content: {
    // marginLeft: 14,
    flexShrink: 1,
    // marginLeft: 14,
    // backgroundColor: Colors.brandPrimary,
  },
})

export default Checkbox
