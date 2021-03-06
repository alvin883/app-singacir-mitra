import React, { useCallback } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  PinMap,
  EditSchedule,
  EditMenuDiscount,
  OTP,
  Success,
  Warung,
} from "_views"
import { Heading } from "_atoms"
import { View } from "react-native"
import StackOptions from "_routers/config/StackOptions"
import DashboardMenuStack from "./DashboardMenuStack"
import IllustrationWaiting from "_assets/images/illustration-waiting.png"
import { navigationServices, asyncHandle } from "_utils"
import { Colors } from "_styles"
import DashboardCategoryStack from "./DashboardCategoryStack"
import { useFocusEffect } from "@react-navigation/native"
import { useState } from "react"
import axios from "axios"
import { LoadingView } from "_organisms"
import { useSelector } from "react-redux"

const Stack = createStackNavigator()
// const initParams = {
//   customBg: Colors.brandWarung,
//   customColor: Colors.themeLight,
// }

const DashboardStack = () => {
  const submitProsesWithdraw = () => {
    navigationServices.Navigate("warung/dashboard")
  }
  const [warungId, setWarungId] = useState()
  const [isFetching, setFetching] = useState(true)
  const mitraId = useSelector(state => state.authReducer.mitraId)

  const initParams = {
    customBg: Colors.brandWarung,
    customColor: Colors.themeLight,
    warungId: warungId,
  }

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(`${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`)
    setFetching(false)
    navigationServices.GoBack()
    return false
  }

  const fetchWarungId = async () => {
    let apiPromise, apiRes, apiErr

    // Get warungId
    apiPromise = axios.get("mitras/showMitra", { params: { mitraId: mitraId } })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "showMitraErr", "mitra-1")
    const warungId = apiRes.data.data.Warung.id
    setWarungId(warungId)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchWarungId()
    }, []),
  )

  if (isFetching) return <LoadingView />

  return (
    <Stack.Navigator {...StackOptions}>
      <Stack.Screen
        name="warung/dashboard"
        component={Warung.Dashboard}
        options={{ title: "Warung" }}
        initialParams={{
          withGoBack: true,
          customBackAction: () => navigationServices.GoBack(),
          ...initParams,
        }}
      />
      <Stack.Screen
        name="warung/dashboard/profil"
        component={Warung.Profile}
        options={{ title: "Profil Warung" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/pemilik"
        component={Warung.DataPribadi}
        options={{ title: "Data Pribadi" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/alamat"
        component={Warung.Alamat}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/edit-alamat"
        component={Warung.AlamatSingle}
        options={{ title: "Alamat" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/jadwal"
        component={Warung.Jadwal}
        options={{ title: "Jam Operasional" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/edit-jadwal"
        component={EditSchedule}
        options={({ navigation, route }) => ({
          title: `Jadwal: ${route.params.dayName}`,
        })}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/category"
        options={{ title: "Kategori Produk", headerShown: false }}
        component={DashboardCategoryStack}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/menu"
        options={{ title: "Menu" }}
        component={DashboardMenuStack}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/form-menu"
        component={Warung.MenuForm}
        options={{ title: "Tambah Menu" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/edit-promo"
        component={EditMenuDiscount}
        options={{ title: "Harga Promo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/withdraw"
        component={Warung.CairkanSaldo}
        options={{ title: "Cairkan Saldo" }}
        initialParams={initParams}
      />
      <Stack.Screen
        name="warung/dashboard/otp-withdraw"
        component={OTP}
        options={{ title: "Verifikasi OTP" }}
        initialParams={{
          navigateRouteName: "warung/dashboard/proses-withdraw",
          ...initParams,
        }}
      />
      <Stack.Screen
        name="warung/dashboard/proses-withdraw"
        component={Success}
        options={{ title: "Pencairan diproses" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Pencairan akan kami proses",
          content: `Kami akan mereview pengajuan kemitraan untuk warung anda, dan ketika semua selesai kami akan memberitahu anda.`,
          actionText: "Ke Dashboard",
          action: submitProsesWithdraw,
          backAction: submitProsesWithdraw,

          // Parameter for StackOptions
          customBackAction: submitProsesWithdraw,

          ...initParams,
        }}
      />
      <Stack.Screen
        name="warung/dashboard/promo"
        component={Warung.Promo}
        options={{ title: "Atur Promo" }}
      />
      <Stack.Screen
        name="warung/dashboard/preview"
        component={Warung.Preview}
        options={{ title: "Preview" }}
      />
      <Stack.Screen
        name="warung/dashboard/preview-detail"
        component={Warung.PreviewDetail}
        options={{ title: "Preview" }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
