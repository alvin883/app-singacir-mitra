import React from "react"
import { ScrollView, View } from "react-native"
import { Text } from "_atoms"
import { formatDate } from "_utils"

const OrderDetail = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View>
        <View>
          <Text size="small"> {formatDate()}</Text>
        </View>
        <Text>Text</Text>
      </View>
    </ScrollView>
  )
}

export default OrderDetail
