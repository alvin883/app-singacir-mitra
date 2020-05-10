import React from "react"
import { CommonActions } from "@react-navigation/native"

const NavigationRef = React.createRef()

const Navigate = (name, params) => {
  if (NavigationRef.current) NavigationRef.current.navigate(name, params)
}

const GoBack = (routeName = null) => {
  if (NavigationRef.current) {
    // console.log(NavigationRef.current)
    // console.log(NavigationRef.current.getRootState())

    // const _rootState = NavigationRef.current.getRootState()
    // console.log("\n\n\n")
    // console.log(
    //   "Last route params : ",
    //   _rootState.routes[_rootState.routes.length - 1].params,
    // )

    // const _target = _rootState.routes

    // NavigationRef.current.dispatch({
    //   ...CommonActions.goBack(),
    //   source: _rootState.routes[_rootState.routes.length - 1].key,
    //   target: _rootState.routes[],
    // })

    NavigationRef.current.goBack(routeName)
  }
}

const getActiveRouteName = state => {
  if (!state || !state.routes) return undefined

  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name ? route.name : undefined
}

const CurrentRouteName = () => {
  if (NavigationRef.current) {
    const state = NavigationRef.current.getRootState()
    const currentRouteName = getActiveRouteName(state)

    // console.log("CurrentRouteName - current: ", NavigationRef.current)
    // console.log("CurrentRouteName - current.routename: ", currentRouteName)

    return currentRouteName
  }

  return undefined
}

export { NavigationRef, Navigate, GoBack, CurrentRouteName }
