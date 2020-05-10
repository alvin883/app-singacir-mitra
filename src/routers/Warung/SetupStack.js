import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Warung, PinMap, EditSchedule, Success } from "_views"
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
        name="warung/setup/steps"
        component={Warung.Setup.Steps}
        options={{ title: "Warungku" }}
      />
      <Stack.Screen
        name="warung/setup/set-pin-map"
        component={PinMap}
        options={{ title: "Pin Maps" }}
      />
      <Stack.Screen
        name="warung/setup/edit-jadwal"
        component={EditSchedule}
        options={{ title: "Jadwal" }}
      />
      <Stack.Screen
        name="warung/setup/success"
        component={Success}
        options={{ title: "Warungku" }}
        initialParams={{
          // Parameters for views component
          illustration: IllustrationWaiting,
          title: "Menunggu Persetujuan",
          content: `Kami akan mereview pengajuan kemitraan untuk warung anda, dan ketika semua selesai kami akan memberitahu anda.`,
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
