import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "_atoms"
import { timeSince, convertToCurrency } from "_utils"
import { IconName } from "_c_a_icons"

const OrderItem = ({ name, time, totalPrice, onClickDetail }) => (
  <View style={styles.wrapper}>
    <View style={styles.top}>
      <Text weight="bold">{name}</Text>
      <Text size="small" style={styles.timestamp}>
        {timeSince(time)}
      </Text>
    </View>
    <View style={styles.middle}>
      <Text size="small" style={styles.priceTitle}>
        Total:
      </Text>
      <Text size="small" style={styles.priceValue}>
        Rp {convertToCurrency(totalPrice)}
      </Text>
    </View>
    <Button
      style={styles.button}
      text="Lihat Detail"
      type="secondary"
      iconName={IconName.chevronRight}
      iconPosition="right"
      onPress={onClickDetail}
    />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {},
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timestamp: {
    opacity: 0.6,
  },
  middle: {
    flexDirection: "row",
    marginTop: 10,
  },
  priceTitle: {
    opacity: 0.7,
    marginRight: 6,
  },
  button: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 14,
  },
})

export default OrderItem
