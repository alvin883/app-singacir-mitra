import React, { useState } from "react"
import PropTypes from "prop-types"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, Infobox } from "_atoms"
import { IconName } from "_c_a_icons"
import { Spaces } from "_styles"
import { sample, navigationServices } from "_utils"
import { MenuManage } from "_molecules"

const Promo = () => {
  const initMenuList = sample.RestoMenu
  const [menuList, setMenuList] = useState(initMenuList)

  const onChangeAPI = () => {
    console.log("onChangeAPI - placeholder")
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Infobox iconName={IconName.information}>
          Semua promo yang sedang berlangsung akan terlihat disini
        </Infobox>

        {menuList.map((val, i) => (
          <MenuManage
            key={i}
            style={styles.menuManage}
            {...val}
            withDiscountPeriod={true}
            onEdit={() =>
              navigationServices.Navigate("pedagang/dashboard/form-menu", {
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
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: Spaces.container,
  },
  menuManage: {
    marginTop: 30,
  },
})

export default Promo
