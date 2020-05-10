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

const Stack = createStackNavigator()

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
        }}
      />
      <Stack.Screen
        name="resto/dashboard/profil"
        component={Resto.Profile}
        options={{ title: "Profil Resto" }}
      />
      <Stack.Screen
        name="resto/dashboard/pemilik"
        component={Resto.DataPribadi}
        options={{ title: "Data Pribadi" }}
      />
      <Stack.Screen
        name="resto/dashboard/alamat"
        component={Resto.Alamat}
        options={{ title: "Alamat" }}
      />
      <Stack.Screen
        name="resto/dashboard/edit-alamat"
        component={Resto.AlamatSingle}
        options={{ title: "Alamat" }}
      />
      <Stack.Screen
        name="resto/dashboard/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
      />
      <Stack.Screen
        name="resto/dashboard/jadwal"
        component={Resto.Jadwal}
        options={{ title: "Jam Operasional" }}
      />
      <Stack.Screen
        name="resto/dashboard/edit-jadwal"
        component={EditSchedule}
        options={({ navigation, route }) => ({
          title: `Jadwal: ${route.params.dayName}`,
        })}
      />
      <Stack.Screen
        name="resto/dashboard/menu"
        options={{ title: "Menu" }}
        component={DashboardMenuStack}
      />
      <Stack.Screen
        name="resto/dashboard/form-menu"
        component={Resto.MenuForm}
        options={{ title: "Tambah Menu" }}
      />
      <Stack.Screen
        name="resto/dashboard/edit-promo"
        component={EditMenuDiscount}
        options={{ title: "Harga Promo" }}
      />
      <Stack.Screen
        name="resto/dashboard/withdraw"
        component={Resto.CairkanSaldo}
        options={{ title: "Cairkan Saldo" }}
      />
      <Stack.Screen
        name="resto/dashboard/otp-withdraw"
        component={OTP}
        options={{ title: "Verifikasi OTP" }}
        initialParams={{
          navigateRouteName: "resto/dashboard/proses-withdraw",
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
        }}
      />
      <Stack.Screen
        name="resto/dashboard/promo"
        component={Resto.Promo}
        options={{ title: "Atur Promo" }}
      />
      <Stack.Screen
        name="resto/dashboard/preview"
        component={Resto.Preview}
        options={{ title: "Preview" }}
      />
      <Stack.Screen
        name="resto/dashboard/preview-detail"
        component={Resto.PreviewDetail}
        options={{ title: "Preview" }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
