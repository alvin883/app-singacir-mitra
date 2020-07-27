import React from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { InputLabel, Text, Button } from "_atoms"
import { hexToRgb } from "_utils"
import { Colors } from "_styles"

const WorkHourItem = ({ label, openHour, closeHour, isOpen, onPress }) => {
  return (
    <View style={styles.wrapper}>
      <InputLabel text={label} />
      <View style={styles.bottom}>
        {isOpen ? (
          <View style={styles.hourWrapper}>
            <Text size="medium" style={{ ...styles.text }}>
              {openHour}
            </Text>
            <Text
              size="medium"
              style={{ ...styles.text, ...styles.textDivider }}>
              -
            </Text>
            <Text size="medium" style={{ ...styles.text }}>
              {closeHour}
            </Text>
          </View>
        ) : (
          <View style={styles.hourWrapper}>
            <Text size="medium" style={{ ...styles.text }}>
              Tutup
            </Text>
          </View>
        )}
        <Button text="Ubah" type="secondary" onPress={onPress} />
      </View>
    </View>
  )
}

WorkHourItem.propTypes = {
  label: PropTypes.string,
  openHour: PropTypes.string.isRequired,
  closeHour: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

WorkHourItem.defaultProps = {
  onPress: () => {},
}

const styles = StyleSheet.create({
  wrapper: {},
  label: {},
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hourWrapper: {
    flexDirection: "row",
  },
  text: {
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  textDivider: {
    marginHorizontal: 6,
  },
})

export default WorkHourItem
