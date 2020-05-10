import React from "react"
import { View, StyleSheet, ViewPropTypes, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { Heading, ImageWithFallback, Price, Button, Text } from "_atoms"
import { IconName } from "_c_a_icons"
import { FontSizes, Colors, FontFamily } from "_styles"
import { hexToRgb, sourcePropType, convertToCurrency } from "_utils"
import { useSelector, useDispatch } from "react-redux"

// TODO: Define prop type
const MerchantMenu = ({
  id,
  image,
  name,
  price,
  discount_price,
  style,
  reducerName,
  addAction,
  reduceAction,
  withColorIndicator,
  isReview,
}) => {
  /**
   * Whether to render with action buttons or not. If this false, it will
   * render the subtotal of this item and without the action buttons
   */
  const isWithAction = addAction && reduceAction && reducerName ? true : false

  const dispatch = useDispatch()
  const dispatchParams = {
    id: id,
    image: image,
    name: name,
    price: price,
    discount_price: discount_price,
  }

  let selectedItems
  let itemIndex
  let isSelected = false
  let quantity = 0
  let onAdd = () => {}
  let onReduce = () => {}

  if (reducerName) {
    selectedItems = useSelector(state => state[reducerName].selected)
    itemIndex = selectedItems.findIndex(val => val.id === id)
    isSelected = itemIndex >= 0
    quantity = isSelected ? selectedItems[itemIndex].quantity : 0
  }

  if (isWithAction) {
    onAdd = () => dispatch(addAction(dispatchParams))
    onReduce = () => dispatch(reduceAction(dispatchParams))
  }

  const _changeColor = isSelected && withColorIndicator
  const changeColor = _changeColor ? { color: Colors.brandPrimary } : {}

  const getSubtotal = ({ price, discount_price, quantity }) => {
    let subtotal

    if (discount_price) {
      subtotal = discount_price * quantity
    } else {
      subtotal = price * quantity
    }

    return subtotal
  }

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <View style={styles.left}>
        <ImageWithFallback source={image} style={styles.image} />
      </View>

      <View style={styles.right}>
        <View style={styles.right_1}>
          <Heading
            style={{ ...styles.name, ...changeColor }}
            text={name}
            numberOfLines={1}
          />

          {!isReview && (
            <Price
              price={price}
              discount_price={discount_price}
              priceStyle={styles.priceStyle}
            />
          )}

          {isSelected ? (
            <Text style={{ ...styles.quantity, ...changeColor }}>
              {quantity} item
            </Text>
          ) : null}

          {isReview && (
            <View style={styles.subtotal}>
              <Text style={styles.subtotalKey}>Total:</Text>
              <Text style={styles.subtotalValue}>
                {convertToCurrency(
                  getSubtotal({ price, discount_price, quantity }),
                )}
              </Text>
            </View>
          )}
        </View>
        {isWithAction && (
          <View style={styles.right_2}>
            {isSelected ? (
              <>
                <Button
                  type="primary"
                  size="small"
                  baseColor={Colors.brandPrimary}
                  style={styles.button}
                  iconName={IconName.plus}
                  iconStyle={styles.buttonIcon}
                  onPress={onAdd}
                />
                <Button
                  type="secondary"
                  size="small"
                  style={{ ...styles.button, marginTop: 6 }}
                  iconName={IconName.minus}
                  iconStyle={styles.buttonIcon}
                  onPress={onReduce}
                />
              </>
            ) : (
              <Button
                type="primary"
                size="small"
                baseColor={Colors.brandSecondary}
                style={styles.button}
                iconName={IconName.plus}
                iconStyle={styles.buttonIcon}
                onPress={onAdd}
                /**
                 * Why use TouchableOpacity instead the default?
                 * there's rendering issue that will occur, due to react virtualDOM (maybe)
                 * but if you use different elementType it will dissapear ¯\_(ツ)_/¯
                 */
                Tag={TouchableOpacity}
                customProps={{ activeOpacity: 0.8 }}
              />
            )}
          </View>
        )}
      </View>
    </View>
  )
}

MerchantMenu.propTypes = {
  id: PropTypes.string,
  image: ImageWithFallback.propTypes.source,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  discount_price: PropTypes.number,
  style: ViewPropTypes.style,
  reducerName: PropTypes.string,
  addAction: PropTypes.func,
  reduceAction: PropTypes.func,
  withColorIndicator: PropTypes.bool,
  isReview: PropTypes.bool,
}

MerchantMenu.defaultProps = {
  style: {},
  withColorIndicator: true,
  isReview: false,
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
  button: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  buttonIcon: {
    marginRight: 0,
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

export default MerchantMenu
