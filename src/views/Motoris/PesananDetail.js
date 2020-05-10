import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ScrollView, View, StyleSheet, ViewPropTypes } from "react-native"
import { Text, Divider, Button } from "_atoms"
import {
  formatDate,
  dateToUnix,
  hexToRgb,
  convertToCurrency,
  sample,
} from "_utils"
import { LoadingView, MerchantMenuList } from "_organisms"
import { Spaces, Colors, FontFamily } from "_styles"
import { Icon, IconName } from "_c_a_icons"
import { OrderDetailMenu, PairTitleValue, PriceInfo } from "_molecules"

const ORDER_LIST = sample.RestoMenu.map((val, i) => {
  val.quantity = 2

  return val
})

const DATA = {
  order_id: "918238",
  date_order: dateToUnix(new Date()) - 4,
  total_transaction: 327000,
  menu_price: 25000,
  fullname: "Stephen Hawking",
  driver_name: "John Doe",
  list: ORDER_LIST,
  subtotal: 320000,
  transaction_fee: 5000,
  mitra_tips: 2000,
}

const PesananDetail = ({ navigation, route }) => {
  const order_id = route.params?.order_id
  const withAction = route.params?.withAction
  const onAccept = route.params?.onAccept
  const onReject = route.params?.onReject

  const [data, setData] = useState()
  const [orderList, setOrderList] = useState([])
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    let isMounted = true
    setTimeout(() => {
      if (isMounted) {
        setData(DATA)
        setFetching(false)

        let orderMapping = ORDER_LIST.map((val, i) => ({
          id: val.menu_id,
          image: val.menu_pict,
          name: val.menu_name,
          price: val.menu_price,
          discount_price: val.promo_price,
        }))

        setOrderList(orderMapping)
      }
    }, 1000)

    return () => (isMounted = false)
  }, [])

  if (isFetching) return <LoadingView />

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <Meta
            dateOrder={data.date_order}
            orderId={data.order_id}
            totalPrice={data.total_transaction}
          />

          <Divider style={styles.divider} />
          <Person name={data.fullname} iconName={IconName.account} />
          <Divider style={styles.divider} />

          <View>
            <Text weight="bold">Alamat</Text>
            <PairTitleValue
              style={styles.pairTitleValue}
              title="Pembeli"
              value="Jl. Gatot Subroto, Jakarta"
            />
            <PairTitleValue
              style={styles.pairTitleValue}
              title="Resto"
              value="Jl. Gatot Subroto, Jakarta"
            />
            {/* <Button
              text="Lihat Pin Maps"
              type="secondary"
              size="small"
              iconName={IconName.chevronRight}
              iconPosition="right"
              style={styles.pinMap}
            /> */}
          </View>

          <Divider style={styles.divider} />

          <PairTitleValue title="Metode Pembayaran" value="Tunai" />
          <PairTitleValue
            style={styles.pairTitleValue}
            title="Total Pesanan"
            value={"Rp " + convertToCurrency(data.subtotal)}
          />
          <PairTitleValue
            style={styles.pairTitleValue}
            title="Tips"
            value={"Rp " + convertToCurrency(data.mitra_tips)}
          />
          <PairTitleValue
            style={{
              ...styles.pairTitleValue,
              marginHorizontal: 0,
            }}
            title="Total"
            value={"Rp " + convertToCurrency(data.total_transaction)}
            emphasize={true}
          />

          <Divider style={styles.divider} />

          <View>
            <Text weight="bold">Daftar Pesanan</Text>
            {data.list.map((val, i) => (
              <OrderDetailMenu key={i} {...val} />
            ))}
          </View>
        </View>
      </ScrollView>

      {withAction && (
        <View style={styles.bottom}>
          <Button
            style={styles.bottomButton}
            text="Tolak"
            type="secondary"
            size="large"
            onPress={onReject}
          />
          <Button
            style={styles.bottomButton}
            text="Terima"
            size="large"
            onPress={onAccept}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
  merchantMenuList: {
    marginHorizontal: 0 - Spaces.container,
  },
  pairTitleValue: {
    marginTop: 14,
  },
  pinMap: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 14,
  },
  bottom: {
    flexDirection: "row",
    paddingHorizontal: Spaces.container - 6,
    paddingVertical: Spaces.container,
    borderTopColor: Colors.themeBorder,
    borderTopWidth: 1,
    backgroundColor: Colors.themeLight,
  },
  bottomButton: {
    flex: 0.5,
    margin: 6,
  },
})

const Meta = ({ orderId, totalPrice, dateOrder }) => (
  <View>
    <Text size="small" style={MetaStyles.orderDate}>
      {formatDate(dateOrder, false, true)}
    </Text>
    <Text weight="bold" style={MetaStyles.orderId}>
      ID#{orderId}
    </Text>
    <View style={MetaStyles.total}>
      <Text size="small" style={MetaStyles.totalTitle}>
        Total:
      </Text>
      <Text size="small" style={MetaStyles.totalValue}>
        Rp {convertToCurrency(totalPrice)}
      </Text>
    </View>
  </View>
)

Meta.propTypes = {
  orderId: PropTypes.string,
  totalPrice: PropTypes.number,
  dateOrder: PropTypes.number,
}

const MetaStyles = StyleSheet.create({
  orderDate: {
    color: hexToRgb(Colors.textPrimary, 0.6),
  },
  orderId: {
    marginTop: 10,
  },
  total: {
    marginTop: 6,
    flexDirection: "row",
  },
  totalTitle: {
    opacity: 0.6,
    marginRight: 6,
  },
})

const Person = ({ iconName, name, onCall, style }) => (
  <View style={{ ...PersonStyles.wrapper, ...style }}>
    <View style={PersonStyles.circle}>
      <Icon
        name={iconName}
        style={PersonStyles.icon}
        color={Colors.themeLight}
      />
    </View>
    <Text style={PersonStyles.name} weight="bold">
      {name}
    </Text>
    <Button
      style={PersonStyles.button}
      iconName={IconName.phone}
      shape="circle"
      size="small"
      onPress={onCall}
    />
  </View>
)

Person.propTypes = {
  iconName: Icon.propTypes.name,
  name: PropTypes.string,
  onCall: PropTypes.func,
  style: ViewPropTypes.style,
}

const PersonStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderRadius: 50,
    backgroundColor: Colors.brandSecondary,
  },
  icon: {
    height: 20,
    width: 20,
  },
  name: {
    flexGrow: 1,
  },
  button: {
    height: 34,
    width: 34,
  },
})

export default PesananDetail
