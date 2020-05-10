import React from "react"
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  ColorPropType,
} from "react-native"
import { Colors, FontFamily, FontSizes } from "_styles"
import PropTypes from "prop-types"
import { Icon, IconName } from "_c_a_icons"
import { hexToRgb, capitalFirst, customPropTypes } from "_utils"
import InputLabel from "./InputLabel"
import Content from "./Content"

const RenderIconLeft = ({
  IconLeft,
  IconLeftStyle,
  IconLeftColor,
  IconLeftClickable,
  IconLeftOnclick,
  stylePreset,
}) => {
  const style = `iconLeft${capitalFirst(stylePreset)}`

  if (!IconLeft) return null

  return IconLeftClickable ? (
    <TouchableOpacity
      onPress={IconLeftOnclick}
      style={{ ...styles[style], ...IconLeftStyle }}>
      <Icon name={IconLeft} color={IconLeftColor} />
    </TouchableOpacity>
  ) : (
    <Icon
      name={IconLeft}
      style={{ ...styles[style], ...IconLeftStyle }}
      color={IconLeftColor}
    />
  )
}

/**
 * @augments {React.Component<Input.propTypes, {}>}
 */
class Input extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string,
    // onChangeText: PropTypes.func.isRequired,
    onChangeText: customPropTypes.functionWithParams(1),
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    fieldStyle: ViewPropTypes.style,
    labelStyle: Text.propTypes.style,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    defaultValue: PropTypes.string,
    status: PropTypes.oneOf(["normal", "warning", "error"]).isRequired,
    editable: PropTypes.bool,
    value: PropTypes.string,
    warning: PropTypes.string,
    IconLeft: PropTypes.string,
    IconLeftStyle: ViewPropTypes.style,
    IconLeftColor: ColorPropType,
    IconLeftClickable: PropTypes.bool,
    IconLeftOnclick: PropTypes.func.isRequired,
    stylePreset: PropTypes.oneOf(["normal", "boxed"]).isRequired,
    pointerEvents: PropTypes.string,
    onTouchStart: PropTypes.func,
  }

  static defaultProps = {
    onChangeText: text => {},
    onFocus: () => {},
    onBlur: () => {},
    style: {},
    fieldStyle: {},
    labelStyle: {},
    secureTextEntry: false,
    IconLeftStyle: {},
    IconLeftClickable: false,
    IconLeftOnclick: () => {},
    stylePreset: "normal",
    status: "normal",
    editable: true,
    onTouchStart: () => {},
  }

  constructor(props) {
    super(props)

    const isFilled = props.defaultValue || props.value

    this.state = {
      isFocused: false,
      isFilled: isFilled ? true : false,
      text: props.defaultValue ? props.defaultValue : "",
      isRawPassword: props.secureTextEntry,
    }
  }

  componentDidUpdate(prevProps) {
    const isDefaultValue = this.props.defaultValue !== prevProps.defaultValue
    const isValue = this.props.value !== prevProps.value

    if (isDefaultValue || isValue) {
      const isFilled = this.props.defaultValue || this.props.value

      this.setState({
        isFilled: isFilled,
      })
    }
  }

  handleOnChangeText = text => {
    this.props.onChangeText(text)
    this.setState({ text: text })
  }

  handleOnFocus = () => {
    this.props.onFocus()
    this.setState({ isFocused: true })
  }

  handleOnBlur = () => {
    this.props.onBlur()
    const newState = {
      isFocused: false,
      isFilled: this.state.text && this.state.text.length,
    }

    this.setState(newState)
  }

  togglePasswordView = () => {
    this.setState(prevState => ({ isRawPassword: !prevState.isRawPassword }))
  }

  render() {
    const {
      placeholder,
      label,
      style,
      fieldStyle,
      labelStyle,
      secureTextEntry,
      keyboardType,
      defaultValue,
      stylePreset,
      value,
      warning,
      status,
      editable,
      pointerEvents,
      onTouchStart,
    } = this.props

    const { isFocused, isFilled, isRawPassword } = this.state

    // Dynamic Style
    const isActive = isFocused || isFilled
    const field = `fieldPreset${capitalFirst(stylePreset)}`
    const fieldState = `fieldState${isActive ? "Active" : "Inactive"}`
    const fieldStatus = `fieldStatus${capitalFirst(status)}`
    const wrapper = `wrapperPreset${capitalFirst(stylePreset)}`

    return (
      <View style={{ ...style }}>
        <InputLabel text={label} style={labelStyle} />

        <View style={styles[wrapper]}>
          <RenderIconLeft {...this.props} />

          <TextInput
            style={{
              ...styles[field],
              ...styles[fieldState],
              ...styles[fieldStatus],
              ...fieldStyle,
            }}
            onTouchStart={onTouchStart}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onChangeText={this.handleOnChangeText}
            placeholder={placeholder}
            secureTextEntry={isRawPassword}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            value={value}
            editable={editable}
            pointerEvents={pointerEvents}
          />

          {secureTextEntry && isRawPassword && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={this.togglePasswordView}>
              <Icon
                name={IconName.eyeOff}
                color={hexToRgb(Colors.textPrimary, 0.4)}
              />
            </TouchableOpacity>
          )}

          {secureTextEntry && !isRawPassword && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={this.togglePasswordView}>
              <Icon
                name={IconName.eye}
                color={hexToRgb(Colors.textPrimary, 0.4)}
              />
            </TouchableOpacity>
          )}
        </View>

        {typeof warning === "string" && warning.length > 0 && (
          <View style={styles.warning}>
            <Content style={styles.warningText}>{warning}</Content>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapperPresetNormal: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  wrapperPresetBoxed: {
    position: "relative",
  },
  fieldPresetNormal: {
    flexGrow: 1,
    paddingVertical: 6,
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.normal,
    borderBottomWidth: 1,
    color: Colors.textPrimary,
  },
  fieldPresetBoxed: {
    paddingLeft: 14 + 24 + 10,
    paddingVertical: 16,
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.normal,
    borderBottomWidth: 0,
    borderRadius: 4,
    color: Colors.textPrimary,
    backgroundColor: Colors.themeBorder,
  },
  fieldStateInactive: { borderColor: hexToRgb(Colors.themeDark, 0.25) },
  fieldStateActive: { borderColor: Colors.brandPrimary },
  fieldStatusError: { borderColor: Colors.themeDanger },
  iconLeftNormal: {
    marginRight: 10,
  },
  iconLeftBoxed: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 2,
    marginRight: 10,
  },
  eyeIcon: {
    position: "absolute",
    padding: 8,
    bottom: 0,
    right: 0,
    zIndex: 3,
  },
  warning: {
    padding: 8,
    marginTop: 6,
    borderRadius: 4,
    // borderTopStartRadius: 0,
    // borderTopEndRadius: 0,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  warningText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
})

export default Input
