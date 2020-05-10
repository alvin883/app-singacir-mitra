import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Profile, Success } from "_views"
import StackOptions from "_routers/config/StackOptions"
import { navigationServices } from "_utils"

const Stack = createStackNavigator()

const ProfileStack = () => {
  const submitSuccessDonation = () => {
    navigationServices.Navigate("dashboard")
  }

  return (
    <Stack.Navigator {...StackOptions} initialRouteName="ProfileLanding">
      <Stack.Screen
        name="profile/landing"
        component={Profile.Landing}
        options={{ title: "Profil" }}
        initialParams={{ withGoBack: true }}
      />

      <Stack.Screen
        name="profile/edit"
        component={Profile.Edit}
        options={{ title: "Edit Profil" }}
      />

      <Stack.Screen
        name="profile/edit-pass"
        component={Profile.EditPass}
        options={{ title: "Ubah Kata Sandi" }}
      />

      <Stack.Screen
        name="profile/balance-history"
        component={Profile.BalanceHistory}
        options={{ title: "History" }}
      />

      <Stack.Screen
        name="profile/donation"
        component={Profile.Donation}
        options={{ title: "Donasi" }}
      />

      <Stack.Screen
        name="profile/success-donation"
        component={Success}
        options={{ title: "Berhasil" }}
        initialParams={{
          // Parameter for StackOptions
          backAction: submitSuccessDonation,
          customBackAction: submitSuccessDonation,
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
