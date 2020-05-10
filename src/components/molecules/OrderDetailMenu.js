import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import { ImageWithFallback, Heading, Text } from "_atoms"
import { convertToCurrency, hexToRgb } from "_utils"
import { Colors, FontSizes } from "_styles"

const OrderDetailMenu = ({
  menu_pict,
  menu_name,
  menu_price,
  promo_price,
  quantity,
  style,
}) => {
  const getSubtotal = ({ menu_price, promo_price, quantity }) => {
    let subtotal

    if (promo_price) {
      subtotal = promo_price * quantity
    } else {
      subtotal = menu_price * quantity
    }

    return subtotal
  }

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <View style={styles.left}>
        <ImageWithFallback source={menu_pict} style={styles.image} />
      </View>

      <View style={styles.right}>
        <View style={styles.right_1}>
          <Heading style={styles.name} text={menu_name} numberOfLines={1} />

          <Text style={styles.quantity}>{quantity} item</Text>

          <View style={styles.subtotal}>
            <Text style={styles.subtotalKey}>Total:</Text>
            <Text style={styles.subtotalValue}>
              Rp{" "}
              {convertToCurrency(
                getSubtotal({ menu_price, promo_price, quantity }),
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  left: {},
  image: {
    height: 70,
    width: 70,
    borderRadius: 4,
  },
  right: {
    flexDirection: "row",
    marginLeft: 14,
    flexGrow: 1,
  },
  right_1: {
    flex: 1,
  },
  right_2: {
    flex: 0,
  },
  name: {
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  priceWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  priceStyle: {
    fontSize: FontSizes.normal,
  },
  quantity: {
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  subtotal: {
    flexDirection: "row",
  },
  subtotalKey: {
    opacity: 0.6,
  },
  subtotalValue: {
    marginLeft: 6,
  },
})

export default OrderDetailMenu
