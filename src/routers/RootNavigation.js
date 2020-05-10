import React, { useEffect, useState } from "react"
import "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import SplashScreen from "react-native-splash-screen"
import AsyncStorage from "@react-native-community/async-storage"
import store from "../store"
import { Loading } from "_views"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"
import { auth } from "_actions"
import * as Resto from "./Resto"
import { role } from "_types"
import _ from "lodash"

const Root = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoading: true,
  })

  const [authState, setAuthState] = useState({
    token: null,
    userId: null,
    username: null,
    role: null,
    hasSetup: false,
    hasApproved: false,
  })

  const checkLogin = () => {
    AsyncStorage.getItem("auth")
      .then(authRaw => {
        if (authRaw) {
          // When user have logged in
          const authData = JSON.parse(authRaw)

          // authData.hasSetup = false

          // Store auth data]
          setAuthState(authData)
          setState({ isLoading: false })
          dispatch(auth.login(authData))
        } else {
          // When user is not login
          return setState({ isLoading: false })
        }
      })

      // When AsyncStorage trigger an error
      .catch(err => {
        console.log("checkLogin: AsyncStorage Error - ", err)
        setState({ isLoading: false })
      })
  }

  const handleStoreChange = () => {
    const newAuthState = store.getState().authReducer

    // Compare the value, if it's not equal then we shouldUpdate
    const shouldUpdate = !_.isEqual(authState, newAuthState)

    if (shouldUpdate) {
      console.log("shouldUpdate - auth : ", authState)
      console.log("shouldUpdate - nAuth: ", newAuthState)

      setAuthState(newAuthState)
      setState({ isLoading: false })
      AsyncStorage.setItem("auth", JSON.stringify(newAuthState))
    }
  }

  const unsubscribe = store.subscribe(handleStoreChange)

  // Equal to componentDidMount
  useEffect(() => {
    SplashScreen.hide()
    checkLogin()
  }, [])

  // Equal to componentDidUpdate
  useEffect(() => {
    // unsubscribe when componentUnmout
    return () => unsubscribe()
  })

  if (state.isLoading) return <Loading />
  if (!authState.token) return <AuthStack />

  return <AppStack role={authState.role} hasSetup={authState.hasSetup} />

  // return state.isLogin ? <AppStack /> : <AuthStack />
}

export default Root
