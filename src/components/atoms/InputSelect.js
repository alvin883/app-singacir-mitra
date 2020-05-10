import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  ColorPropType,
} from "react-native"
import PropTypes from "prop-types"
import RNPicker from "react-native-picker-select"
import { FontFamily, FontSizes, Colors } from "_styles"
import { hexToRgb } from "_utils"
import { Icon, IconName } from "_c_a_icons"
import InputLabel from "./InputLabel"

const InputSelect = ({
  style,
  label,
  placeholder,
  options,
  onSelect,
  iconName,
  iconStyle,
  iconColor,
  value,
}) => {
  const pickerStyles = value ? { ...p_styles, ...p_stylesActive } : p_styles
  const SelectIcon = () => (
    <Icon
      name={iconName}
      style={{ ...styles.icon, ...iconStyle }}
      color={iconColor}
    />
  )
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <InputLabel text={label} />
      <RNPicker
        onValueChange={onSelect}
        items={options}
        placeholder={{
          label: placeholder,
          color: pickerStyles.placeholder.color,
        }}
        value={value}
        useNativeAndroidPickerStyle={false}
        style={pickerStyles}
        Icon={SelectIcon}
      />
    </View>
  )
}

InputSelect.defaultProps = {
  style: {},
  options: [],
  onSelect: val => {},
  iconName: IconName.chevronDown,
  iconStyle: {},
  iconColor: Colors.brandPrimary,
}

InputSelect.propTypes = {
  style: ViewPropTypes.style,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  iconStyle: ViewPropTypes.style,
  iconColor: ColorPropType,
  value: PropTypes.string,
}

const p_styles = StyleSheet.create({
  inputAndroid: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgb(Colors.themeDark, 0.25),
    color: Colors.textPrimary,
  },
  inputAndroidContainer: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    // backgroundColor: "blue",
  },
  headlessAndroidContainer: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    // backgroundColor: "yellow",
  },
  viewContainer: {
    // backgroundColor: "red",
  },
  placeholder: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary, 0.5),
  },
})
const p_stylesActive = StyleSheet.create({
  inputAndroid: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brandPrimary,
    color: Colors.textPrimary,
  },
})
const styles = {
  wrapper: {},
  icon: {
    marginTop: 8,
    marginRight: 14,
  },
}

export default InputSelect
