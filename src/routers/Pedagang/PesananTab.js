import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import MaterialTopTabOptions from "_routers/config/MaterialTopTabOptions"
import DashboardStack from "./DashboardStack"
import { View } from "react-native"
import { Text } from "_atoms"
import { IconName } from "_c_a_icons"
import StackOptions from "_routers/config/StackOptions"
import { navigationServices } from "_utils"
import { Pedagang } from "_views"
import { Colors } from "_styles"

const Stack = createStackNavigator()
const RNTab = createMaterialTopTabNavigator()
const initParams = {
  customBg: Colors.brandPedagang,
  customColor: Colors.themeLight,
}

const Tab = () => (
  <RNTab.Navigator {...MaterialTopTabOptions} backBehavior="initialRoute">
    <RNTab.Screen
      name="pedagang/pesanan/baru"
      component={Pedagang.PesananBaru}
      options={{ title: "Pesanan Baru" }}
    />
    <RNTab.Screen
      name="pedagang/pesanan/proses"
      component={Pedagang.PesananProses}
      options={{ title: "Diproses" }}
    />
  </RNTab.Navigator>
)

const PesananTab = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="pedagang/pesanan"
      component={Tab}
      options={{ title: "Pesanan" }}
      initialParams={initParams}
      //   initialParams={{
      //     withGoBack: true,
      //     customBackAction: () => navigationServices.GoBack(),
      //   }}
    />
  </Stack.Navigator>
)

export default PesananTab
