import * as React from "react"
import PropTypes from "prop-types"
import { Svg, Path } from "react-native-svg"
import { ColorPropType, ViewPropTypes } from "react-native"

const Icon = ({ color, style, name }) => {
  return (
    <Svg
      width={style.width || 24}
      height={style.height || 24}
      style={style}
      viewBox="0 0 24 24"
      fill="none">
      <Path d={name} fill={color} />
    </Svg>
  )
}

Icon.propTypes = {
  color: ColorPropType,
  style: ViewPropTypes.style,
  name: PropTypes.string.isRequired,
}

Icon.defaultProps = {
  style: {},
  color: "#000000",
}

export default Icon
