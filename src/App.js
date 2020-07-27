import React from "react"
import { SafeAreaView, YellowBox, Linking } from "react-native"
import { RootNavigation } from "_routers"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { navigationServices } from "_utils"
import store from "./store"
import axios from "axios"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    axios.defaults.baseURL = "http://api.si-ngacir.com/api/v1/singacir/"
    Linking.addEventListener("url", this.handleIncomingURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleIncomingURL)
  }

  handleIncomingURL(event) {
    const url = event.url
    const payload = url.split("/reset?token=")
    const isResetPassword = payload.length > 1

    console.log(event)
    console.log(url)
    console.log({ isResetPassword })

    if (isResetPassword) {
      // console.log("Reset Password", navigationServices.NavigationRef)
      // this.rootRouter.navigate("LupaPasswordReset")
      const token = payload[1]
      navigationServices.Navigate("LupaPasswordReset", { token: token })
    }
  }

  render() {
    /**
     * TODO: You should resolve this, there's issue with `react-native-snap-carousel`
     * @link https://stackoverflow.com/a/61023244/6049731
     */
    YellowBox.ignoreWarnings([
      "FlatList: Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
    ])

    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <NavigationContainer ref={navigationServices.NavigationRef}>
              <RootNavigation />
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
      </>
    )
  }
}

export default App
