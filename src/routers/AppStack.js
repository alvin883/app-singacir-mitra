import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { Dashboard, OrderDetail } from "_views"
import { role } from "_types"
import * as Resto from "./Resto"
import * as Warung from "./Warung"
import * as Pedagang from "./Pedagang"
import * as Motoris from "./Motoris"
import { View } from "react-native"
import { Text } from "_atoms"
import {
  Resto as RestoScreen,
  Warung as WarungScreen,
  Pedagang as PedagangScreen,
  Motoris as MotorisScreen,
} from "_views"
import KomunitasStack from "./Komunitas"
import ProfileStack from "./ProfileStack"
import { Colors } from "_styles"
import MakComblangStack from "./MakComblangStack"

const Stack = createStackNavigator()

const AppStack = ({ role: authRole, hasSetup }) => {
  if (hasSetup) {
    return (
      <Stack.Navigator {...StackOptions}>
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ title: "Dashboard", headerShown: false }}
          initialParams={{
            authRole: authRole,
          }}
        />

        <Stack.Screen
          name="komunitas"
          component={KomunitasStack}
          options={{ title: "Komunitas", headerShown: false }}
          initialParams={{
            customBg: Colors.brandKomunitas,
            customColor: Colors.themeLight,
          }}
        />

        <Stack.Screen
          name="makcomblang"
          component={MakComblangStack}
          options={{ title: "Mak Comblang", headerShown: false }}
          initialParams={{
            customBg: Colors.brandMakcomblang,
            customColor: Colors.themeLight,
          }}
        />

        <Stack.Screen
          name="profile"
          component={ProfileStack}
          options={{ title: "Profil", headerShown: false }}
        />

        {authRole === role.RESTO && (
          <>
            <Stack.Screen
              name="dashboard/resto"
              component={Resto.Tab}
              options={{ title: "Resto", headerShown: false }}
              initialParams={{
                customBg: Colors.brandResto,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/resto/pesanan-detail"
              component={RestoScreen.PesananDetail}
              options={{ title: "Detail" }}
              initialParams={{
                customBg: Colors.brandResto,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/resto/pesanan-tolak"
              component={RestoScreen.PesananTolak}
              options={{ title: "Konfirmasi" }}
              initialParams={{
                customBg: Colors.brandResto,
                customColor: Colors.themeLight,
              }}
            />
          </>
        )}

        {authRole === role.WARUNG && (
          <>
            <Stack.Screen
              name="dashboard/warung"
              component={Warung.Tab}
              options={{ title: "Warung", headerShown: false }}
              initialParams={{
                customBg: Colors.brandWarung,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/warung/pesanan-detail"
              component={WarungScreen.PesananDetail}
              options={{ title: "Detail" }}
              initialParams={{
                customBg: Colors.brandWarung,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/warung/pesanan-tolak"
              component={WarungScreen.PesananTolak}
              options={{ title: "Konfirmasi" }}
              initialParams={{
                customBg: Colors.brandWarung,
                customColor: Colors.themeLight,
              }}
            />
          </>
        )}

        {authRole === role.PEDAGANG && (
          <>
            <Stack.Screen
              name="dashboard/pedagang"
              component={Pedagang.Tab}
              options={{ title: "Resto", headerShown: false }}
              initialParams={{
                customBg: Colors.brandPedagang,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/pedagang/pesanan-detail"
              component={PedagangScreen.PesananDetail}
              options={{ title: "Detail" }}
              initialParams={{
                customBg: Colors.brandPedagang,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/pedagang/pesanan-tolak"
              component={PedagangScreen.PesananTolak}
              options={{ title: "Konfirmasi" }}
              initialParams={{
                customBg: Colors.brandPedagang,
                customColor: Colors.themeLight,
              }}
            />
          </>
        )}

        {authRole === role.MOTORIS && (
          <>
            <Stack.Screen
              name="dashboard/motoris"
              component={Motoris.Tab}
              options={{ title: "Motoris", headerShown: false }}
              initialParams={{
                customBg: Colors.brandMotoris,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/motoris/pesanan-detail"
              component={MotorisScreen.PesananDetail}
              options={{ title: "Detail" }}
              initialParams={{
                customBg: Colors.brandMotoris,
                customColor: Colors.themeLight,
              }}
            />
            <Stack.Screen
              name="dashboard/motoris/pesanan-tolak"
              component={MotorisScreen.PesananTolak}
              options={{ title: "Konfirmasi" }}
              initialParams={{
                customBg: Colors.brandMotoris,
                customColor: Colors.themeLight,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    )
  } else {
    if (authRole === role.RESTO) {
      return <Resto.SetupStack />
    } else if (authRole === role.WARUNG) {
      return <Warung.SetupStack />
    } else if (authRole === role.PEDAGANG) {
      return <Pedagang.SetupStack />
    } else if (authRole === role.MOTORIS) {
      return <Motoris.SetupStack />
    }
  }
}

export default AppStack
