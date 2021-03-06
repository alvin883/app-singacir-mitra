import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { Icon, IconName } from "_c_a_icons"
import { Colors, Spaces, FontFamily } from "_styles"
import { navigationServices, hexToRgb } from "_utils"
import { role } from "_types"
import { Text } from "_atoms"

const RenderButtons = ({ items }) => {
  return items.map((val, i) => (
    <TouchableOpacity
      style={styles.button}
      key={i}
      activeOpacity={0.5}
      onPress={() => navigationServices.Navigate(val.link)}>
      <View
        style={{
          ...styles.buttonCircle,
          ...(val.color ? { backgroundColor: val.color } : {}),
        }}>
        <Icon
          name={val.iconName}
          color={Colors.themeLight}
          style={styles.buttonIcon}
        />
      </View>
      <Text style={styles.buttonText} weight="bold">
        {val.name}
      </Text>
      <Icon
        style={styles.buttonChevron}
        name={IconName.chevronRight}
        color={Colors.brandPrimary}
      />
    </TouchableOpacity>
  ))
}

const Features = ({ authRole }) => {
  let items = []

  if (authRole === role.RESTO) {
    items.push({
      name: "Resto",
      iconName: IconName.fork,
      link: "dashboard/resto",
      color: Colors.brandResto,
    })
  } else if (authRole === role.WARUNG) {
    items.push({
      name: "Warung Emak",
      iconName: IconName.store,
      link: "dashboard/warung",
      color: Colors.brandWarung,
    })
  } else if (authRole === role.PEDAGANG) {
    items.push({
      name: "Pedagang Keliling",
      iconName: IconName.fork,
      link: "dashboard/pedagang",
      color: Colors.brandPedagang,
    })
  } else if (authRole === role.MOTORIS) {
    items.push({
      name: "Motoris",
      iconName: IconName.motocycle,
      link: "dashboard/motoris",
      color: Colors.brandMotoris,
    })
  }

  items.push({
    name: "Komunitas",
    iconName: IconName.people,
    link: "komunitas",
    color: Colors.brandKomunitas,
  })

  items.push({
    name: "Mak Comblang",
    iconName: IconName.hand,
    link: "makcomblang",
    color: Colors.brandMakcomblang,
  })

  return (
    <View style={styles.container}>
      <View style={styles.features}>
        <RenderButtons items={items} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 30,
    marginBottom: 30,
    marginHorizontal: Spaces.container,
  },
  features: {
    marginLeft: -4,
    marginRight: -4,
  },
  button: {
    margin: 4,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: hexToRgb(Colors.brandPrimary, 0.2),
  },
  buttonCircle: {
    width: 34,
    height: 34,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    backgroundColor: Colors.brandPrimary,
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  buttonText: {
    flexGrow: 1,
    color: Colors.brandPrimary,
  },
})

export default Features
