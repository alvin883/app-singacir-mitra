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
import { Warung } from "_views"

const Stack = createStackNavigator()
const RNTab = createMaterialTopTabNavigator()

const Tab = () => (
  <RNTab.Navigator {...MaterialTopTabOptions} backBehavior="initialRoute">
    <RNTab.Screen
      name="warung/pesanan/baru"
      component={Warung.PesananBaru}
      options={{ title: "Pesanan Baru" }}
    />
    <RNTab.Screen
      name="warung/pesanan/proses"
      component={Warung.PesananProses}
      options={{ title: "Diproses" }}
    />
  </RNTab.Navigator>
)

const PesananTab = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="warung/pesanan"
      component={Tab}
      options={{ title: "Pesanan" }}
      //   initialParams={{
      //     withGoBack: true,
      //     customBackAction: () => navigationServices.GoBack(),
      //   }}
    />
  </Stack.Navigator>
)

export default PesananTab
