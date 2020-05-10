import React from "react"
import {
  TouchableOpacity,
  TouchableHighlight,
  ViewPropTypes,
  StyleSheet,
  Text,
  ColorPropType,
  ActivityIndicator,
} from "react-native"
import PropTypes from "prop-types"
import { Colors, FontFamily, FontSizes } from "_styles"
import { shadeColor, hexToRgb, capitalFirst } from "_utils"
import { Icon as Iconv2 } from "_c_a_icons"

const defaultStyle = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonTypePrimary: {
    backgroundColor: Colors.brandPrimary,
  },
  buttonTypeSecondary: {
    backgroundColor: Colors.brandPrimary + "18",
  },
  buttonTypeNude: {
    backgroundColor: "rgba(255,255,255,0)",
  },
  buttonShapeCircle: {
    height: 44,
    width: 44,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 1000,
  },
  buttonSizeNormal: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  buttonSizeSmall: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonSizeLarge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
  },
  buttonStateDefault: {},
  buttonStateDisabled: {
    opacity: 0.6,
  },
  buttonStateLoading: {},
  text: {
    // flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.bold,
    // backgroundColor: "red",
  },
  textTypePrimary: {
    color: Colors.themeLight,
  },
  textTypeSecondary: {
    color: Colors.brandPrimary,
  },
  textTypeNude: {
    color: Colors.brandPrimary,
  },
  textSizeNormal: {},
  textSizeSmall: {},
  textSizeLarge: {
    flex: 1,
  },
  textStateDefault: {},
  textStateDisabled: {},
  textStateLoading: {
    opacity: 0,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
  },
  icon: {},
  iconPositionLeft: {
    marginRight: 10,
  },
  iconPositionRight: {
    marginLeft: 10,
  },

  // `center` is not an option
  // this will automatically active when `shape` === `circle`
  iconPositionCenter: {
    margin: 0,
  },

  iconSizeSmall: {
    height: 20,
    width: 20,
  },

  iconStateDefault: {},
  iconStateDisabled: {},
  iconStateLoading: {
    opacity: 0,
  },
})

/**
 * Get style with a given type or size
 *
 * @param {( "button" | "text" | "icon" )} element
 */
const getStyle = (
  element,
  {
    style,
    textStyle,
    iconStyle,
    type,
    shape,
    size,
    state,
    baseColor,
    accentColor,
    iconPosition,
  },
) => {
  if (shape === "circle") {
    iconPosition = "center"
  }

  let returnStyle = {
    ...defaultStyle[element],

    // Add style based on selected 'type'
    ...defaultStyle[`${element}Type${capitalFirst(type)}`],

    // Add style based on selected 'size'
    ...defaultStyle[`${element}Size${capitalFirst(size)}`],

    // Add style base on selected 'state'
    ...defaultStyle[`${element}State${capitalFirst(state)}`],

    // Add style based on selected 'shape'
    ...defaultStyle[`${element}Shape${capitalFirst(shape)}`],
  }

  // Add additional style
  if (element === "button") {
    returnStyle = { ...returnStyle, ...style }
  } else if (element === "text") {
    returnStyle = { ...returnStyle, ...textStyle }
  } else if (element === "icon") {
    returnStyle = {
      ...returnStyle,
      ...defaultStyle[`iconPosition${capitalFirst(iconPosition)}`],
      ...iconStyle,
    }
  }

  // Setup color and backgroundColor for primary type
  if (type === "primary" && baseColor) {
    if (element === "button") {
      returnStyle.backgroundColor = baseColor
    } else if (element === "text") {
      returnStyle.color = accentColor
    }
  }

  // Setup color and backgroundColor for secondary type
  if (type === "secondary" && baseColor) {
    if (element === "button") {
      returnStyle.backgroundColor = hexToRgb(baseColor, 0.2)
    } else if (element === "text") {
      returnStyle.color = baseColor
    }
  }

  // Setup color and backgroundColor for nude type
  if (type === "nude" && baseColor) {
    if (element === "text") {
      returnStyle.color = baseColor
    }
  }

  return returnStyle
}

const iconColorValue = ({ type, baseColor, accentColor }) => {
  let returnColor

  if (type === "primary") {
    returnColor = accentColor
  } else {
    // Type secondary NOR nude
    returnColor = baseColor
  }

  return returnColor
}

const underlayColorValue = ({ type, baseColor }) => {
  let returnColor

  if (type === "primary") {
    // Darken Color
    returnColor = baseColor
      ? shadeColor(baseColor, -14)
      : shadeColor(Colors.brandPrimary, -14)
  } else if (type === "secondary") {
    returnColor = baseColor
      ? hexToRgb(baseColor, 0.28)
      : hexToRgb(Colors.brandPrimary, 0.28)
  } else if (type === "nude") {
    returnColor = baseColor
      ? hexToRgb(baseColor, 0.14)
      : hexToRgb(Colors.brandPrimary, 0.14)
  }

  return returnColor
}

const Button = props => {
  const {
    state,
    onPress,
    text,
    iconPosition,
    IconSVG,
    iconName,
    shape,
    Tag,
    customProps,
  } = props

  return (
    <Tag
      style={getStyle("button", props)}
      underlayColor={underlayColorValue(props)}
      onPress={onPress}
      disabled={state === "disabled" || state === "loading"}
      {...customProps}>
      <>
        {shape === "normal" && (
          <>
            {/* NOTE: this is for the multicolor icon, which used in Auth screen , otherwise use iconName instead */}
            {iconPosition === "left" && IconSVG && (
              <IconSVG
                style={getStyle("icon", props)}
                color={iconColorValue(props)}
              />
            )}

            {iconPosition === "left" && iconName && (
              <Iconv2
                name={iconName}
                style={getStyle("icon", props)}
                color={iconColorValue(props)}
              />
            )}

            {text.length > 0 && (
              <Text style={getStyle("text", props)}>{text}</Text>
            )}

            {/* NOTE: this is for the multicolor icon, which used in Auth screen , otherwise use iconName instead */}
            {iconPosition === "right" && IconSVG && (
              <IconSVG
                style={getStyle("icon", props)}
                color={iconColorValue(props)}
              />
            )}

            {iconPosition === "right" && iconName && (
              <Iconv2
                name={iconName}
                style={getStyle("icon", props)}
                color={iconColorValue(props)}
              />
            )}
          </>
        )}

        {/* NOTE: this is for the multicolor icon, which used in Auth screen , otherwise use iconName instead */}
        {shape === "circle" && IconSVG && (
          <IconSVG
            style={getStyle("icon", props)}
            color={iconColorValue(props)}
          />
        )}

        {shape === "circle" && iconName && (
          <Iconv2
            name={iconName}
            style={getStyle("icon", props)}
            color={iconColorValue(props)}
          />
        )}

        {state === "loading" && (
          <ActivityIndicator
            color={iconColorValue(props)}
            style={defaultStyle.loader}
          />
        )}
      </>
    </Tag>
  )
}

Button.propTypes = {
  accentColor: ColorPropType,
  baseColor: ColorPropType,
  onPress: PropTypes.func,
  shape: PropTypes.oneOf(["normal", "circle"]).isRequired,
  size: PropTypes.oneOf(["small", "normal", "large"]).isRequired,
  state: PropTypes.oneOf(["default", "disabled", "loading"]).isRequired,
  style: ViewPropTypes.style,
  text: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "right", "center"]).isRequired,
  textStyle: Text.propTypes.style,
  type: PropTypes.oneOf(["primary", "secondary", "nude"]).isRequired,
  iconPosition: PropTypes.oneOf(["left", "right", "center"]).isRequired,
  iconStyle: ViewPropTypes.style,
  iconName: PropTypes.string,

  /**
   * NOTE: this is for the multicolor icon, which used in Auth screen , otherwise use iconName instead
   */
  IconSVG: PropTypes.elementType,

  /**
   * To customize the elementType of this button
   *
   * Why we need this?
   * to solve rendering issue in some place (ex: ItemMenu.js component)
   *
   * default: TouchableHightlight
   */
  Tag: PropTypes.elementType,

  /**
   * To pass directly props to the parent elementType (ex: TouchableHighlight)
   * Use with caution, avoid props that already defined in the PropTypes spec
   */
  customProps: PropTypes.object,
}

Button.defaultProps = {
  accentColor: Colors.themeLight,
  baseColor: Colors.brandPrimary,
  onPress: () => {},
  shape: "normal",
  size: "normal",
  state: "default",
  style: {},
  text: "",
  textAlign: "center",
  textStyle: {},
  type: "primary",
  iconPosition: "left",
  iconStyle: {},
  Tag: TouchableHighlight,
  customProps: {},
}

export default Button
export const ButtonStyle = defaultStyle
