import React, { useEffect, useState } from "react"
import "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
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
import JwtDecode from "jwt-decode"
import { asyncHandle, apiHelpers } from "_utils"
import axios from "axios"
import { role_api, roleName_api } from "../types/role"

const Root = () => {
  const dispatch = useDispatch()
  const authStateStore = useSelector(state => state?.authReducer || false)

  const [authState, setAuthState] = useState({
    role: null,
    hasSetup: false,
    hasApproved: false,
  })
  const [state, setState] = useState({
    isLoading: true,
    isLogin: false,
  })

  // AsyncStorage.clear()

  const checkLogin = async () => {
    const restorePromise = AsyncStorage.getItem("token")
    const [token, tokenErr] = await asyncHandle(restorePromise)

    if (tokenErr) {
      console.log("RootNavigation.js - checkLogin: error", err)
      return setState({
        isLogin: false,
        isLoading: false,
      })
    }

    if (!token) {
      console.log("checkLogin: not logged-in")
      return setState({
        isLoading: false,
        isLoading: false,
      })
    }

    const data = JwtDecode(token)
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

    // Get Mitra Role
    const mitraInfoPromise = apiHelpers.fetchRole({ mitraId: data.mitraId })
    const [mitraInfoRes, mitraInfoErr] = await asyncHandle(mitraInfoPromise)

    if (mitraInfoErr) {
      console.log("checkLogin: error get mitra role")
      return setState({
        isLogin: false,
        isLoading: false,
      })
    }

    const mitraInfo = mitraInfoRes.data.data
    const mitraRole = mitraInfo.Business.id
    const mitraRoleName = roleName_api[mitraRole]
    const mitraHasSetup = mitraInfo[mitraRoleName]?.id ? true : false
    data.token = token
    data.role = mitraRole
    data.hasSetup = mitraHasSetup
    data.hasApproved = false

    // Get Mitra Approval
    // let mitraApproved
    // if (!mitraHasSetup){
    //   mitraApproved = false
    // } else {
    //   const
    // }

    console.log("mitraRole: ", mitraRole)

    setAuthState({
      ...authState,
      role: data.role,
      hasSetup: data.hasSetup,
      hasApproved: false,
    })

    console.log("role nih ya", data.role)
    console.log("role nih ya", role_api[data.role])

    dispatch(auth.login(data))
  }

  const handleStoreChange = () => {
    const prevState = authState
    const user = store.getState().authReducer
    const isLogin = user.mitraId !== null ? true : false
    const shouldUpdate = isLogin !== prevState.isLogin
    // const shouldUpdateSetup = user.hasSetup !== prevState.hasSetup

    console.log("login:", { isLogin, user })

    if (shouldUpdate) {
      setState({
        isLogin: isLogin,
        isLoading: false,
      })

      console.log("handleStoreChange - shouldUpdate")
      console.log("state", authState)
    }

    // if (shouldUpdateSetup) {
    //   setAuthState({
    //     ...state,
    //     hasSetup: user.hasSetup,
    //   })
    //   console.log("handleStoreChange, change hasSetup", {
    //     hasSetup: user.hasSetup,
    //     state,
    //   })
    // }

    console.log("handleStoreChange:", user)
  }

  const unsubscribe = store.subscribe(handleStoreChange)
  const hasSetupValue = authStateStore?.hasSetup ? true : false
  const roleIsNotDefined =
    authStateStore?.role === undefined || authStateStore?.role === null
  const roleValue = authStateStore?.role

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

  // console.log({ state })

  if (state.isLoading) return <Loading />
  if (!state.isLogin || roleIsNotDefined) {
    return <AuthStack />
  }

  return <AppStack role={role_api[roleValue]} hasSetup={hasSetupValue} />

  // return state.isLogin ? <AppStack /> : <AuthStack />
}

export default Root
