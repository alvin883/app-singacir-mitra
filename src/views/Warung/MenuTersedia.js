import React, { useState } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, Button, ImageWithFallback, Price } from "_atoms"
import { Colors, Spaces, FontSizes } from "_styles"
import { MerchantMenuList } from "_organisms"
import { convertToCurrency, navigationServices, sample } from "_utils"
import { MenuManage } from "_molecules"

const MenuTersedia = ({ navigation, route }) => {
  const initMenuList = sample.RestoMenu
  const [menuList, setMenuList] = useState(initMenuList)

  const onChangeAPI = () => {
    console.log("onChangeAPI - placeholder")
  }

  const clickAddMenu = () =>
    navigationServices.Navigate("warung/dashboard/form-menu", {
      onValidSubmit: data => {
        let newMenuList = [...menuList, data]

        // TODO: API

        setMenuList(newMenuList)
        navigationServices.GoBack()
      },
    })

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.top}>
        <View style={styles.topInner}>
          {menuList.map((val, i) => (
            <MenuManage
              key={i}
              style={{ marginTop: i === 0 ? 0 : 30 }}
              {...val}
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
      <View style={styles.bottom}>
        <Button text="Tambah Menu" size="large" onPress={clickAddMenu} />
      </View>
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
  bottom: {
    padding: Spaces.container,
    borderTopColor: Colors.themeBorder,
    borderTopWidth: 1,
    backgroundColor: Colors.themeLight,
  },
})

export default MenuTersedia
