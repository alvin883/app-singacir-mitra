import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  KomunitasDetail,
  KomunitasCreate,
  KomunitasAddActivity,
  Komunitas,
} from "_views"
import StackOptions from "_routers/config/StackOptions"
import Tabs from "./Tabs"

const Stack = createStackNavigator()

const KomunitasStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="komunitas/landing"
      component={Tabs}
      options={{ title: "Komunitas", headerShown: false }}
    />
    <Stack.Screen
      name="komunitas/detail"
      component={Komunitas.Detail}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="komunitas/edit-form"
      component={Komunitas.EditForm}
      options={({ navigation, route }) => ({
        title: route.params?.isEditing ? "Edit Komunitas" : "Buat Komunitas",
      })}
    />

    <Stack.Screen
      name="komunitas/add-activity"
      component={Komunitas.AddActivity}
      options={({ route }) => ({ title: route.params.routeTitle })}
    />
  </Stack.Navigator>
)

export default KomunitasStack
