import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { OTP, Success, Motoris } from "_views"
import StackOptions from "_routers/config/StackOptions"
import IllustrationWaiting from "_assets/images/illustration-waiting.png"
import { navigationServices } from "_utils"

const Stack = createStackNavigator()

const DashboardStack = () => {
  const submitProsesWithdraw = () => {
    navigationServices.Navigate("motoris/dashboard")
  }

  return (
    <Stack.Navigator {...StackOptions}>
      <Stack.Screen
        name="motoris/dashboard"
        component={Motoris.Dashboard}
        options={{ title: "Motoris" }}
        initialParams={{
          withGoBack: true,
          customBackAction: () => navigationServices.GoBack(),
        }}
      />
      <Stack.Screen
        name="motoris/dashboard/profil"
        component={Motoris.Profile}
        options={{ title: "Profil Motoris" }}
      />
      <Stack.Screen
        name="motoris/dashboard/daftar-kiriman"
        component={Motoris.DaftarKiriman}
        options={{ title: "Daftar Kiriman" }}
      />
      <Stack.Screen
        name="motoris/dashboard/withdraw"
        component={Motoris.CairkanSaldo}
        options={{ title: "Cairkan Saldo" }}
      />
      <Stack.Screen
        name="motoris/dashboard/otp-withdraw"
        component={OTP}
        options={{ title: "Verifikasi OTP" }}
        initialParams={{
          navigateRouteName: "motoris/dashboard/proses-withdraw",
        }}
      />
      <Stack.Screen
        name="motoris/dashboard/proses-withdraw"
        component={Success}
        options={{ title: "Pencairan diproses" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Pencairan akan kami proses",
          content: `Kami akan mereview pengajuan kemitraan motoris anda, dan ketika semua selesai kami akan memberitahu anda.`,
          actionText: "Ke Dashboard",
          action: submitProsesWithdraw,
          backAction: submitProsesWithdraw,

          // Parameter for StackOptions
          customBackAction: submitProsesWithdraw,
        }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
