import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Pedagang, PinMap, EditSchedule, Success } from "_views"
import StackOptions from "_routers/config/StackOptions"
import IllustrationWaiting from "_assets/images/illustration-waiting.png"
import { Image, Dimensions } from "react-native"
import { Spaces } from "_styles"
import { navigationServices } from "_utils"
import { useDispatch } from "react-redux"
import { auth } from "_actions"

const Stack = createStackNavigator()

const SetupStack = () => {
  const dispatch = useDispatch()
  const finishSetup = () => {
    dispatch(auth.setSetup(true))
  }

  return (
    <Stack.Navigator {...StackOptions}>
      <Stack.Screen
        name="pedagang/setup/steps"
        component={Pedagang.Setup.Steps}
        options={{ title: "Pedagang" }}
      />
      <Stack.Screen
        name="pedagang/setup/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
      />
      <Stack.Screen
        name="pedagang/setup/edit-jadwal"
        component={EditSchedule}
        options={{ title: "Jadwal" }}
      />
      <Stack.Screen
        name="pedagang/setup/success"
        component={Success}
        options={{ title: "Pedagang" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Menunggu Persetujuan",
          content: `Kami akan mereview pengajuan kemitraan pedagang anda, dan ketika semua selesai kami akan memberitahu anda.`,
          actionText: "Ke Dashboard",
          action: finishSetup,
          backAction: finishSetup,

          // Parameter for StackOptions
          customBackAction: finishSetup,
        }}
      />
    </Stack.Navigator>
  )
}

export default SetupStack
