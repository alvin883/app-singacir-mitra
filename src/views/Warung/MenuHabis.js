import React, { useState } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, Button, ImageWithFallback, Price } from "_atoms"
import { Colors, Spaces, FontSizes } from "_styles"
import { MerchantMenuList } from "_organisms"
import { convertToCurrency, navigationServices, sample } from "_utils"
import { MenuManage } from "_molecules"

const MenuHabis = ({ navigation, route }) => {
  const initMenuList = sample.RestoMenu
  const [menuList, setMenuList] = useState(initMenuList)

  // TODO: fetch api
  console.log("warungCategoryId", route.params.warungCategoryId)

  const onChangeAPI = () => {
    console.log("onChangeAPI - placeholder")
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.top}>
        <View style={styles.topInner}>
          {menuList.map((val, i) => (
            <MenuManage
              key={i}
              style={{ marginTop: i === 0 ? 0 : 30 }}
              {...val}
              withStateChanger={true}
              onEdit={() =>
                navigationServices.Navigate("warung/dashboard/form-menu", {
                  data: val,
                  onValidSubmit: data => {
                    let newMenuList = [...menuList]

                    newMenuList[i] = data
                    onChangeAPI()
                    setMenuList(newMenuList)
                    navigationServices.GoBack()
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  topInner: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
  },
})

export default MenuHabis
