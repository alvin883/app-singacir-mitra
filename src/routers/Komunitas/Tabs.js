import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Success, Komunitas } from "_views"
import { IconName } from "_c_a_icons"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import TabOptions from "_routers/config/TabOptions"
import { Colors } from "_styles"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandKomunitas,
  customColor: Colors.themeLight,
}

const Tabs = () => (
  <Tab.Navigator {...TabOptions} backBehavior="initialRoute">
    <Tab.Screen
      name="komunitas/home"
      component={KomunitasLanding}
      options={{ title: "Home" }}
      initialParams={{ customTabIcon: IconName.home }}
    />

    <Tab.Screen
      name="komunitas/mine"
      component={KomunitasMine}
      options={{ title: "Komunitasku" }}
      initialParams={{ customTabIcon: IconName.group }}
    />
  </Tab.Navigator>
)

/**
 * Why using stack when you just use one component? simply to reuse the header
 * style, that's it :))
 */
const KomunitasLanding = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="komunitas/landing"
      component={Komunitas.Landing}
      options={{ title: "Komunitas" }}
      initialParams={{ withGoBack: true, ...initParams }}
    />
  </Stack.Navigator>
)

const KomunitasMine = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="komunitas/mine"
      component={Komunitas.Mine}
      options={{ title: "Komunitas" }}
      initialParams={{
        withGoBack: true,
        ...initParams,
      }}
    />
  </Stack.Navigator>
)

export default Tabs
