import React from "react"
import { ViewPropTypes, ColorPropType } from "react-native"
import { Svg, Path } from "react-native-svg"
import PropTypes from "prop-types"
import { getValues } from "_utils"

const SvgHOC = ChildComponent => {
  const HOC = ({ color, style }) => (
    <Svg
      width={style.width || 24}
      height={style.height || 24}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <ChildComponent color={color} />
    </Svg>
  )

  HOC.propTypes = {
    style: ViewPropTypes.style,
    color: ColorPropType,
  }

  HOC.defaultProps = {
    style: {},
    color: "#000000",
  }

  return HOC
}

export default SvgHOC

/**
 * @typedef {string} TestType
 */

/**
 * @enum {TestType}
 */
const Icons = {
  share:
    "M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z",
}

/**
 *
 * @param {object} props
 * @param {TestType} props.name
 */
const _icon = ({ color, style, name }) => (
  <Svg
    width={style.width || 24}
    height={style.height || 24}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path d={Icons[name]} fill={color} />
  </Svg>
)

_icon.propTypes = {
  style: ViewPropTypes.style,
  color: ColorPropType,
  name: PropTypes.oneOf(["share", "text"]).isRequired,
}

_icon.defaultProps = {
  style: {},
  color: "#000000",
}

export const Icon = _icon
