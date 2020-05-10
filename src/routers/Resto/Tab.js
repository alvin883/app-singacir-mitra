import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabOptions from "_routers/config/TabOptions"
import DashboardStack from "./DashboardStack"
import { View } from "react-native"
import { Text } from "_atoms"
import { IconName } from "_c_a_icons"
import PesananTab from "./PesananTab"
import { Resto } from "_views"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"

const RNTab = createBottomTabNavigator()

const Stack = createStackNavigator()
const HistoryStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="resto/history/landing"
      component={Resto.History}
      options={{ title: "History Pesanan" }}
    />
  </Stack.Navigator>
)

const Tab = () => (
  <RNTab.Navigator {...TabOptions} backBehavior="initialRoute">
    <RNTab.Screen
      name="resto/dashboard"
      component={DashboardStack}
      options={{ title: "Dashboard" }}
      initialParams={{
        customTabIcon: IconName.store,
        appStackHeaderShown: false,
      }}
    />
    <RNTab.Screen
      name="resto/pesanan"
      component={PesananTab}
      options={{ title: "Pesanan" }}
      initialParams={{
        customTabIcon: IconName.menu,
      }}
    />
    <RNTab.Screen
      name="resto/history"
      component={HistoryStack}
      options={{ title: "History" }}
      initialParams={{
        customTabIcon: IconName.history,
      }}
    />
  </RNTab.Navigator>
)

export default Tab
