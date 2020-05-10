import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, Button, ImageWithFallback, Price } from "_atoms"
import { Colors, Spaces, FontSizes } from "_styles"
import { MerchantMenuList } from "_organisms"
import { convertToCurrency, customPropTypes, formatDate } from "_utils"

const MenuManage = ({
  menu_pict,
  menu_name,
  menu_price,
  promo_price,
  promo_start,
  promo_end,
  onEdit,
  onDelete,
  onStateChange,
  withStateChanger,
  withDiscountPeriod,
  style,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <View>
        <ImageWithFallback source={menu_pict} style={styles.image} />
      </View>
      <View style={styles.right}>
        <Text weight="bold">{menu_name}</Text>

        <Price
          price={menu_price}
          discount_price={promo_price}
          priceStyle={styles.priceStyle}
        />

        {withDiscountPeriod && promo_start && promo_end && (
          <View style={styles.period}>
            <Text style={styles.periodTitle} size="small">
              Periode:
            </Text>
            <Text size="small">{formatDate(promo_start, true)}</Text>
            <Text style={styles.periodDivider} size="small">
              -
            </Text>
            <Text size="small">{formatDate(promo_end, true)}</Text>
          </View>
        )}

        <View style={styles.actions}>
          <Button
            style={styles.button}
            textStyle={styles.buttonText}
            text="Ubah"
            type="nude"
            size="small"
            onPress={onEdit}
          />
          <Button
            style={styles.button}
            textStyle={styles.buttonText}
            text="Hapus"
            type="nude"
            size="small"
            baseColor={Colors.themeDanger}
            onPress={onDelete}
          />

          {withStateChanger && (
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              text="Tersedia"
              type="secondary"
              size="small"
              onPress={onStateChange}
            />
          )}
        </View>
      </View>
    </View>
  )
}

MenuManage.propTypes = {
  image: ImageWithFallback.propTypes.source,
  name: PropTypes.string,
  price: PropTypes.number,
  discount_price: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  withStateChanger: PropTypes.bool,
  withDiscountPeriod: PropTypes.bool,
  style: ViewPropTypes.style,
}

MenuManage.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
  onStateChange: () => {},
  withStateChanger: false,
  withDiscountPeriod: false,
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 4,
  },
  right: {
    marginLeft: 14,
    flexGrow: 1,
    justifyContent: "center",
  },
  period: {
    marginTop: 6,
    flexDirection: "row",
  },
  periodTitle: {
    marginRight: 8,
    color: Colors.brandSecondary,
  },
  periodDivider: {
    marginHorizontal: 6,
  },
  actions: {
    margin: -6,
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    margin: 6,
  },
  buttonText: {
    // fontSize: FontSizes.small,
  },
})

export default MenuManage
