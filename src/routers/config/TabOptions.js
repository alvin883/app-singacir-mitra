import React from "react"
import { Colors, FontFamily, FontSizes } from "_styles"
import { Icon } from "_c_a_icons"

const TabOptions = {
  lazy: true,
  tabBarOptions: {
    activeTintColor: Colors.brandPrimary,
    inactiveTintColor: Colors.themeInactive,
    style: {
      height: 66,
      elevation: 1,
      borderTopColor: Colors.themeBorder,
      borderTopWidth: 1,
    },
    tabStyle: {
      paddingVertical: 12,
    },
    labelStyle: {
      marginTop: 4,
      fontFamily: FontFamily.normal,
      fontSize: FontSizes.small,
    },
  },
  screenOptions: ({ route, navigation }) => ({
    tabBarIcon: ({ focused, color, size }) => (
      <Icon name={route.params.customTabIcon} color={color} />
    ),
  }),
}

export default TabOptions
