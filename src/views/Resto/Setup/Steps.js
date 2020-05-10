import React, { Component, useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Spaces } from "_styles"
import { Stepper } from "_atoms"
import { navigationServices } from "_utils"
import StepProfile from "./StepProfile"
import StepWorkHour from "./StepWorkHour"
import StepPayment from "./StepPayment"
import { FormAddressData, FormWorkHour } from "_organisms"
import { IconName } from "_c_a_icons"
// import { useDispatch } from "react-redux"
// import { auth } from "_actions"

const Steps = () => {
  const [step, setStep] = useState(0)
  const [dataProfile, setDataProfile] = useState(undefined)
  const [dataAddress, setDataAddress] = useState(undefined)
  const [dataWorkHour, setDataWorkHour] = useState(undefined)
  const [dataPayment, setDataPayment] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  // const dispatch = useDispatch()

  const stepComponents = [
    <StepProfile
      data={dataProfile}
      onValidSubmit={data => {
        setDataProfile(data)
        setStep(step + 1)
      }}
    />,
    <FormAddressData
      data={dataAddress}
      onValidSubmit={data => {
        setDataAddress(data)
        setStep(step + 1)
      }}
      pinMapRouteName="resto/setup/set-pin-map"
      iconMarker={IconName.mapMarkerResto}
    />,
    <FormWorkHour
      data={dataWorkHour}
      onValidSubmit={data => {
        setDataWorkHour(data)
        setStep(step + 1)
      }}
      editRouteName="resto/setup/edit-jadwal"
    />,
    <StepPayment
      data={dataPayment}
      onValidSubmit={data => {
        setLoading(true)
        setDataPayment(data)
        // dispatch(auth.hasSetup({ hasSetup: true }))
        navigationServices.Navigate("resto/setup/success")
      }}
    />,
  ]

  const handleBackPress = () => {
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === "resto/setup/steps"

    /**
     * Check whether this event occur when screen is still active or not,
     * Why you need check this? don't it handled by componentWillUnmount?
     * No, componentWillUnmount will take some times to trigger due to the
     * sliding transition each screen, so componentWillUnmout will not be
     * triggered imediately
     */
    if (!isActiveScreen) return false

    if (step > 0) {
      if (!isLoading) {
        // Back one step
        setStep(step - 1)
      }

      // You need to return true
      // in order to prevent back button
      return true
    } else {
      // Back to previous screen
      return false
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  })

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Stepper total={stepComponents.length} current={step + 1} />
        </View>
        <View style={styles.bottom}>{stepComponents[step]}</View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spaces.container,
  },
  top: {
    marginTop: 20,
  },
  bottom: {
    marginTop: 40,
    marginBottom: 40,
  },
})

export default Steps
