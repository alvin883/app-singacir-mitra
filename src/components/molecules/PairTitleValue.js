import React from "react"
import { View, StyleSheet, ViewPropTypes, Text as RNText } from "react-native"
import PropTypes from "prop-types"
import { Text } from "_atoms"
import { Colors } from "_styles"

const PairTitleValue = ({
  title,
  value,
  stylePreset,
  style,
  titleStyle,
  valueStyle,
  emphasize,
}) => {
  const thisWrapper = styles[`wrapper_${stylePreset}`]
  const thisTitle = styles[`title_${stylePreset}`]
  const thisValue = styles[`value_${stylePreset}`]

  const titleWeight = emphasize ? "bold" : "normal"
  const textSize = emphasize ? "medium" : "normal"

  return (
    <View style={{ ...thisWrapper, ...style }}>
      <Text
        style={{ ...thisTitle, ...titleStyle }}
        size={textSize}
        weight={titleWeight}>
        {title}
      </Text>
      <Text
        style={{
          ...thisValue,
          ...{ color: emphasize ? Colors.brandPrimary : Colors.textPrimary },
          ...valueStyle,
        }}
        weight="bold"
        size={textSize}>
        {value}
      </Text>
    </View>
  )
}

PairTitleValue.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
  stylePreset: PropTypes.oneOf(["normal", "table"]),
  style: ViewPropTypes.style,
  titleStyle: RNText.propTypes.style,
  valueStyle: RNText.propTypes.style,
  emphasize: PropTypes.bool,
}

PairTitleValue.defaultProps = {
  stylePreset: "normal",
  emphasize: false,
}

const styles = StyleSheet.create({
  wrapper_normal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title_table: {
    flex: 0.4,
  },
  value_table: {
    flex: 0.6,
  },
  wrapper_table: {
    width: "100%",
    flexDirection: "row",
  },
})

export default PairTitleValue
