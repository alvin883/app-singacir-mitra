import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabOptions from "_routers/config/TabOptions"
import DashboardStack from "./DashboardStack"
import { View } from "react-native"
import { Text } from "_atoms"
import { IconName, Icon } from "_c_a_icons"
import PesananTab from "./PesananTab"
import { Pedagang } from "_views"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { navigationServices } from "_utils"
import { Colors } from "_styles"

const RNTab = createBottomTabNavigator()
const initParams = {
  customBg: Colors.brandPedagang,
  customColor: Colors.themeLight,
}

const Stack = createStackNavigator()
const HistoryStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="pedagang/history/landing"
      component={Pedagang.History}
      options={{ title: "History Pesanan" }}
      initialParams={initParams}
    />
  </Stack.Navigator>
)

const Tab = () => (
  <RNTab.Navigator
    lazy={TabOptions.tab}
    tabBarOptions={TabOptions.tabBarOptions}
    screenOptions={({ navigation, route }) => {
      const routename = navigationServices.CurrentRouteName()
      let isTabVisible = true

      if (routename.includes("pedagang/dashboard/")) {
        isTabVisible = false
      }

      return {
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name={route.params.customTabIcon} color={color} />
        ),
        tabBarVisible: isTabVisible,
      }
    }}
    backBehavior="initialRoute">
    <RNTab.Screen
      name="pedagang/dashboard"
      component={DashboardStack}
      options={{ title: "Dashboard" }}
      initialParams={{
        customTabIcon: IconName.store,
        appStackHeaderShown: false,
      }}
    />
    <RNTab.Screen
      name="pedagang/pesanan"
      component={PesananTab}
      options={{ title: "Pesanan" }}
      initialParams={{
        customTabIcon: IconName.menu,
      }}
    />
    <RNTab.Screen
      name="pedagang/history"
      component={HistoryStack}
      options={{ title: "History" }}
      initialParams={{
        customTabIcon: IconName.history,
      }}
    />
  </RNTab.Navigator>
)

export default Tab
