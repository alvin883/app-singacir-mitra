import React, { Component, useState } from "react"
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import { Heading, ImageWithFallback } from "_atoms"
import { hexToRgb, convertToCurrency, sourcePropType } from "_utils"
import { Colors, FontSizes, FontFamily } from "_styles"

const MerchantMenuSquare = ({
  id,
  image,
  title,
  price,
  discount_price,
  description,
  style,
  onClick,
}) => {
  const onPress = () => {
    onClick({ id, image, title, price, discount_price, description })
  }

  return (
    <TouchableOpacity
      style={{ ...styles.wrapper, ...style }}
      onPress={onPress}
      activeOpacity={0.6}>
      <View style={styles.top}>
        <ImageWithFallback source={image} style={styles.image} />
      </View>
      <View style={styles.bottom}>
        <Heading text={title} numberOfLines={1} style={styles.heading} />
        <View style={styles.priceWrapper}>
          {/* Without Discount Price */}
          {!discount_price && (
            <Text style={styles.price}>Rp {convertToCurrency(price)}</Text>
          )}

          {/* With Discount Price */}
          {discount_price && (
            <>
              <Text style={{ ...styles.price, ...styles.price_disc }}>
                Rp {convertToCurrency(price)}
              </Text>
              <Text style={styles.price}>
                Rp {convertToCurrency(discount_price)}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

MerchantMenuSquare.propTypes = {
  image: sourcePropType,
  title: PropTypes.string,
  price: PropTypes.number,
  discount_price: PropTypes.number,
  style: ViewPropTypes.style,
  onClick: PropTypes.func.isRequired,
}

MerchantMenuSquare.defaultProps = {
  style: {},
  onClick: () => {},
}

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 4,
  },
  bottom: {
    marginTop: 4,
  },
  heading: {
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  priceWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  price: {
    fontSize: FontSizes.small,
    fontFamily: FontFamily.normal,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  price_disc: {
    marginRight: 6,
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
    color: hexToRgb(Colors.textPrimary, 0.3),
  },
})

export default MerchantMenuSquare
