import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { View } from "react-native"
import { Text } from "_atoms"
import { Colors, FontFamily } from "_styles"
import { hexToRgb } from "_utils"
import MaterialTopTabOptions from "_routers/config/MaterialTopTabOptions"
import { Warung } from "_views"

const Tab = createMaterialTopTabNavigator()

const DashboardMenuStack = ({ route, navigation }) => (
  <Tab.Navigator {...MaterialTopTabOptions} backBehavior="initialRoute">
    <Tab.Screen
      name="warung/dashboard/menu/tersedia"
      component={Warung.MenuTersedia}
      options={{ title: "Tersedia" }}
      initialParams={{
        apiEndpoint: "/tersedia",
        menus: route.params?.menus,
        warungId: route.params?.warungId,
        warungCategoryId: route.params?.warungCategoryId,
      }}
    />
    <Tab.Screen
      name="warung/dashboard/menu/habis"
      component={Warung.MenuHabis}
      options={{ title: "Habis" }}
      initialParams={{
        apiEndpoint: "/habis",
        disabledAddMenu: true,
        menus: route.params?.menus,
        warungId: route.params?.warungId,
        warungCategoryId: route.params?.warungCategoryId,
      }}
    />
  </Tab.Navigator>
)

export default DashboardMenuStack
