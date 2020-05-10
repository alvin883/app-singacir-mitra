import React from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { ImageWithFallback, Heading, Button, Content, Price } from "_atoms"
import { Spaces, FontSizes, FontFamily, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import { sourcePropType, hexToRgb } from "_utils"
import { useSelector, useDispatch } from "react-redux"

// TODO: Move this to a component
const MenuSheet = ({
  id,
  image,
  name,
  price,
  discount_price,
  description,
  onClose,
  reducerName,
  addAction,
  reduceAction,
}) => {
  // const selectedItems = useSelector(state => state[reducerName].selected)
  // const itemIndex = selectedItems.findIndex(val => val.id === id)
  // const isSelected = itemIndex >= 0
  // const quantity = isSelected ? selectedItems[itemIndex].quantity : 0
  const quantity = 0
  // const dispatch = useDispatch()
  // const dispatchParams = {
  //   id: id,
  //   image: image,
  //   name: name,
  //   price: price,
  //   discount_price: discount_price,
  // }

  const onAdd = () => {}
  const onReduce = () => {}

  const isQuantity = quantity > 0

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.top}>
        <Button
          shape="circle"
          iconName={IconName.close}
          size="small"
          style={styles.close}
          iconStyle={styles.closeIcon}
          onPress={onClose}
        />
        <ImageWithFallback style={styles.image} source={image} />
        <View style={styles.headingWrapper}>
          <Heading style={styles.heading} text={name} />
          {isQuantity && <Text style={styles.amount}>{quantity} item</Text>}
        </View>

        <Price
          price={price}
          discount_price={discount_price}
          priceStyle={styles.priceStyle}
        />
        <Content style={styles.description}>{description}</Content>
      </ScrollView>
      {isQuantity && (
        <View style={{ ...styles.bottom, ...styles.bottom_flex }}>
          <Button
            type="secondary"
            iconName={IconName.minus}
            iconStyle={styles.buttonIcon}
            style={styles.button_flex}
            onPress={onReduce}
          />
          <Button
            type="primary"
            iconName={IconName.plus}
            iconStyle={styles.buttonIcon}
            style={styles.button_flex}
            onPress={onAdd}
          />
        </View>
      )}

      {!isQuantity && (
        <View style={styles.bottom}>
          <Button type="primary" text="Tambah" size="large" onPress={onAdd} />
        </View>
      )}
    </View>
  )
}

MenuSheet.propTypes = {
  id: PropTypes.string,
  image: sourcePropType,
  name: PropTypes.string,
  price: PropTypes.number,
  discount_price: PropTypes.number,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  // reducerName: PropTypes.string.isRequired,
  // addAction: PropTypes.func.isRequired,
  // reduceAction: PropTypes.func.isRequired,
}

MenuSheet.defaultProps = {
  onClose: () => {},
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    paddingHorizontal: Spaces.container,
  },
  top: {
    flex: 1,
  },
  bottom: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: 14,
  },
  bottom_flex: {
    width: viewport.width - Spaces.container * 2 - 8,
    flexDirection: "row",
    marginLeft: -4,
    marginRight: -4,
  },
  button_flex: {
    width: "50%",
    marginHorizontal: 4,
  },
  close: {
    height: 30,
    width: 30,
    marginTop: 20,
    alignSelf: "flex-end",
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
  image: {
    height: "auto",
    width: viewport.width - Spaces.container * 2,
    marginTop: 14,
    aspectRatio: 6 / 4,
    borderRadius: 4,
  },
  headingWrapper: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: FontSizes.medium,
  },
  amount: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.medium,
    color: Colors.brandPrimary,
  },
  priceStyle: {
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.normal,
  },
  price_disc: {
    marginRight: 6,
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
    color: hexToRgb(Colors.textPrimary, 0.3),
  },
  description: {
    opacity: 0.76,
    fontSize: FontSizes.small + 1,
    marginTop: 14,
  },
  buttonIcon: {
    marginRight: 0,
  },
})

export default MenuSheet
