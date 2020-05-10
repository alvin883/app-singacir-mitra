import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Auth } from "_views"
import StackOptions from "_routers/config/StackOptions"

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="Login"
      component={Auth.Login}
      options={{ title: "Masuk" }}
    />

    <Stack.Screen
      name="Daftar"
      component={Auth.Daftar}
      options={{ title: "Pendaftaran Mitra" }}
    />
  </Stack.Navigator>
)

export default AuthStack
