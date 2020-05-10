import React from "react"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontFamily } from "_styles"
import { InputLabel, Button, Text } from "_atoms"

const CustomScheduleSelector = ({ label, value, onPress, style }) => {
  return (
    <View style={style}>
      <InputLabel text={label} style={styles.label} />

      {value ? (
        <Text weight="bold" style={styles.value}>
          {value}
        </Text>
      ) : null}

      <Button
        text={value ? "Ganti Waktu" : "Pilih Waktu"}
        size="small"
        type="secondary"
        onPress={onPress}
      />
    </View>
  )
}

CustomScheduleSelector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
}

CustomScheduleSelector.defaultProps = {
  onPress: () => {},
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.normal,
    color: Colors.brandPrimary,
  },
  value: {
    paddingBottom: 2,
    marginBottom: 8,
    fontFamily: FontFamily.bold,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeBorder,
  },
})

export default CustomScheduleSelector
