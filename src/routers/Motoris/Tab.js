import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabOptions from "_routers/config/TabOptions"
import { IconName, Icon } from "_c_a_icons"
import DashboardStack from "./DashboardStack"
import { Motoris } from "_views"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { navigationServices } from "_utils"

const RNTab = createBottomTabNavigator()

const Stack = createStackNavigator()
const HistoryStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="motoris/history/landing"
      component={Motoris.History}
      options={{ title: "History Pengantaran" }}
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

      if (routename.includes("motoris/dashboard/")) {
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
      name="motoris/dashboard"
      component={DashboardStack}
      options={{ title: "Dashboard" }}
      initialParams={{
        customTabIcon: IconName.motocycle,
        appStackHeaderShown: false,
      }}
    />
    <RNTab.Screen
      name="motoris/history"
      component={HistoryStack}
      options={{ title: "History" }}
      initialParams={{
        customTabIcon: IconName.history,
      }}
    />
  </RNTab.Navigator>
)

export default Tab
