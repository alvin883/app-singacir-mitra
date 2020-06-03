import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  PinMap,
  EditSchedule,
  EditMenuDiscount,
  OTP,
  Success,
  Pedagang,
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
  customBg: Colors.brandPedagang,
  customColor: Colors.themeLight,
}

const DashboardStack = () => {
  const submitProsesWithdraw = () => {
    navigationServices.Navigate("pedagang/dashboard")
  }

  return (
    <Stack.Navigator {...StackOptions}>
      <Stack.Screen
        name="pedagang/dashboard"
        component={Pedagang.Dashboard}
        options={{ title: "Pedagang" }}
        initialParams={{
          withGoBack: true,
          customBackAction: () => navigationServices.GoBack(),
          ...initParams,
        }}
      />
      <Stack.Screen
        name="pedagang/dashboard/profil"
        component={Pedagang.Profile}
        options={{ title: "Profil Pedagang" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/pemilik"
        component={Pedagang.DataPribadi}
        options={{ title: "Data Pribadi" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/alamat"
        component={Pedagang.Alamat}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/edit-alamat"
        component={Pedagang.AlamatSingle}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/jadwal"
        component={Pedagang.Jadwal}
        options={{ title: "Jam Operasional" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/edit-jadwal"
        component={EditSchedule}
        options={({ navigation, route }) => ({
          title: `Jadwal: ${route.params.dayName}`,
        })}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/menu"
        options={{ title: "Menu" }}
        component={DashboardMenuStack}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/form-menu"
        component={Pedagang.MenuForm}
        options={{ title: "Tambah Menu" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/edit-promo"
        component={EditMenuDiscount}
        options={{ title: "Harga Promo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/withdraw"
        component={Pedagang.CairkanSaldo}
        options={{ title: "Cairkan Saldo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/otp-withdraw"
        component={OTP}
        options={{ title: "Verifikasi OTP" }}
        initialParams={{
          navigateRouteName: "pedagang/dashboard/proses-withdraw",
          ...initParams,
        }}
      />
      <Stack.Screen
        name="pedagang/dashboard/proses-withdraw"
        component={Success}
        options={{ title: "Pencairan diproses" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Pencairan akan kami proses",
          content: `Kami akan mereview pengajuan kemitraan untuk pedagang anda, dan ketika semua selesai kami akan memberitahu anda.`,
          actionText: "Ke Dashboard",
          action: submitProsesWithdraw,
          backAction: submitProsesWithdraw,

          // Parameter for StackOptions
          customBackAction: submitProsesWithdraw,

          ...initParams,
        }}
      />
      <Stack.Screen
        name="pedagang/dashboard/promo"
        component={Pedagang.Promo}
        options={{ title: "Atur Promo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/preview"
        component={Pedagang.Preview}
        options={{ title: "Preview" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="pedagang/dashboard/preview-detail"
        component={Pedagang.PreviewDetail}
        options={{ title: "Preview" }}
        initialParams={initParams}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
