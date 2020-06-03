import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  Resto,
  PinMap,
  EditSchedule,
  EditMenuDiscount,
  OTP,
  Success,
} from "_views"
import { Heading } from "_atoms"
import { View } from "react-native"
import StackOptions from "_routers/config/StackOptions"
import DashboardMenuStack from "./DashboardMenuStack"
import IllustrationWaiting from "_assets/images/illustration-waiting.png"
import { navigationServices } from "_utils"
import { Colors } from "_styles"

const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandResto,
  customColor: Colors.themeLight,
}

const DashboardStack = () => {
  const submitProsesWithdraw = () => {
    navigationServices.Navigate("resto/dashboard")
  }

  return (
    <Stack.Navigator {...StackOptions}>
      <Stack.Screen
        name="resto/dashboard"
        component={Resto.Dashboard}
        options={{ title: "Resto" }}
        initialParams={{
          withGoBack: true,
          customBackAction: () => navigationServices.GoBack(),
          ...initParams,
        }}
      />
      <Stack.Screen
        name="resto/dashboard/profil"
        component={Resto.Profile}
        options={{ title: "Profil Resto" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/pemilik"
        component={Resto.DataPribadi}
        options={{ title: "Data Pribadi" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/alamat"
        component={Resto.Alamat}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/edit-alamat"
        component={Resto.AlamatSingle}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/jadwal"
        component={Resto.Jadwal}
        options={{ title: "Jam Operasional" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/edit-jadwal"
        component={EditSchedule}
        options={({ navigation, route }) => ({
          title: `Jadwal: ${route.params.dayName}`,
        })}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/menu"
        options={{ title: "Menu" }}
        component={DashboardMenuStack}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/form-menu"
        component={Resto.MenuForm}
        options={{ title: "Tambah Menu" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/edit-promo"
        component={EditMenuDiscount}
        options={{ title: "Harga Promo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/withdraw"
        component={Resto.CairkanSaldo}
        options={{ title: "Cairkan Saldo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/otp-withdraw"
        component={OTP}
        options={{ title: "Verifikasi OTP" }}
        initialParams={{
          navigateRouteName: "resto/dashboard/proses-withdraw",
          ...initParams,
        }}
      />
      <Stack.Screen
        name="resto/dashboard/proses-withdraw"
        component={Success}
        options={{ title: "Pencairan diproses" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Pencairan akan kami proses",
          content: `Kami akan mereview pengajuan kemitraan untuk resto anda, dan ketika semua selesai kami akan memberitahu anda.`,
          actionText: "Ke Dashboard",
          action: submitProsesWithdraw,

          // Parameter for StackOptions
          backAction: submitProsesWithdraw,
          customBackAction: submitProsesWithdraw,

          ...initParams,
        }}
      />
      <Stack.Screen
        name="resto/dashboard/promo"
        component={Resto.Promo}
        options={{ title: "Atur Promo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/preview"
        component={Resto.Preview}
        options={{ title: "Preview" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="resto/dashboard/preview-detail"
        component={Resto.PreviewDetail}
        options={{ title: "Preview" }}
        initialParams={initParams}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
