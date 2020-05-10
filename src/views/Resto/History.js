import React, { useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Text, Button, Divider } from "_atoms"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"
import {
  convertToCurrency,
  timeSince,
  unixToDate,
  dateToUnix,
  navigationServices,
} from "_utils"
import { OrderItem } from "_molecules"

const DATA = [
  {
    order_id: "918238",
    date_order: dateToUnix(new Date()) - 4,
    total_transaction: 4500000,
    fullname: "Stephen Hawking",
  },
  {
    order_id: "918237",
    date_order: dateToUnix(new Date("01/10/2020")),
    total_transaction: 300000,
    fullname: "John Doe",
  },
  {
    order_id: "918238",
    date_order: dateToUnix(new Date("02/01/2020")),
    total_transaction: 4500000,
    fullname: "Albert Enstein",
  },
]
const History = () => {
  const [data, setData] = useState(DATA)

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {data.map((val, i) => (
          <React.Fragment key={i}>
            <OrderItem
              name={val.fullname}
              totalPrice={val.total_transaction}
              time={val.date_order}
              onClickDetail={() => {
                navigationServices.Navigate("dashboard/resto/pesanan-detail", {
                  data: val,
                })
              }}
            />
            <Divider style={styles.divider} />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
})

export default History
