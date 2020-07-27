import React, { Component, useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Spaces } from "_styles"
import { Stepper } from "_atoms"
import { navigationServices, asyncHandle } from "_utils"
import StepProfile from "./StepProfile"
import StepWorkHour from "./StepWorkHour"
import StepPayment from "./StepPayment"
import {
  FormAddressData,
  FormWorkHour,
  FormMerchantData,
  FormPaymentData,
} from "_organisms"
import { IconName } from "_c_a_icons"
import AsyncStorage from "@react-native-community/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { auth } from "_actions"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import TextData from "../TextData"

const FormMerchantDataText = TextData.FormMerchantDataText
const FormAddressDataText = TextData.FormAddressDataText
const FormPaymentDataText = TextData.FormPaymentDataText

const Steps = () => {
  const [step, setStep] = useState(0)
  const [dataProfile, setDataProfile] = useState(undefined)
  const [dataAddress, setDataAddress] = useState(undefined)
  const [dataWorkHour, setDataWorkHour] = useState(undefined)
  const [dataPayment, setDataPayment] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  // const dispatch = useDispatch()
  const mitraId = useSelector(state => state.authReducer.mitraId)

  const stepComponents = [
    <FormMerchantData
      data={dataProfile}
      text={FormMerchantDataText}
      onValidSubmit={data => {
        setDataProfile(data)
        setStep(step + 1)
        updateAsyncStorage({ _dataProfile: { ...data } })
      }}
    />,
    <FormAddressData
      data={dataAddress}
      text={FormAddressDataText}
      onValidSubmit={data => {
        setDataAddress(data)
        setStep(step + 1)
        updateAsyncStorage({ _dataAddress: { ...data } })
      }}
      pinMapRouteName="warung/setup/set-pin-map"
      iconMarker={IconName.mapMarkerWarung}
    />,
    <FormWorkHour
      data={dataWorkHour}
      onValidSubmit={data => {
        setDataWorkHour(data)
        setStep(step + 1)
        updateAsyncStorage({ _dataWorkHour: { ...data } })
      }}
      editRouteName="warung/setup/edit-jadwal"
    />,
    <FormPaymentData
      data={dataPayment}
      text={FormPaymentDataText}
      isLoading={isLoading}
      onValidSubmit={data => {
        setLoading(true)
        setDataPayment(data)
        // updateAsyncStorage({ _dataPayment: { ...data } })
        onSubmit()
      }}
    />,
  ]

  const updateAsyncStorage = async ({
    _dataProfile = dataProfile,
    _dataPayment = dataPayment,
    _dataAddress = dataAddress,
    _dataWorkHour = dataWorkHour,
  }) => {
    const _data = {
      dataProfile: _dataProfile,
      dataPayment: _dataPayment,
      dataAddress: _dataAddress,
      dataWorkHour: _dataWorkHour,
    }

    // don't save photo to Async storage
    // delete _data.dataProfile.coverPhoto
    console.log("updateAsyncStorage", _data)

    const data = JSON.stringify(_data)
    const savePromise = AsyncStorage.setItem("warungSetupProfile", data)
    const [saveResult, saveErr] = await asyncHandle(savePromise)
    if (saveErr) return console.log("saveErr", saveErr)
  }

  const errorHandler = (err, titleLog = "Steps Error", errorCodeLog = "") => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(
      `Terjadi kesalahan, silahkan coba beberapa saat lagi${
        errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``
      }`,
    )
    setLoading(false)
    return false
  }

  const onSubmit = async () => {
    setLoading(true)

    if (!dataProfile?.coverPhoto?.uri) {
      setLoading(false)
      alert("Tolong upload cover foto di step 1")
      return false
    }

    if (!dataPayment?.savingBook?.uri) {
      setLoading(false)
      alert("Tolong upload buku tabungan di step 4")
      return false
    }

    // Upload cover image
    let apiData = new FormData()
    apiData.append("image", {
      uri: dataProfile.coverPhoto.uri,
      name: "warungCoverPhoto.jpg",
      type: "image/jpeg",
    })
    let apiPromise = axios.post("uploadimage/warung", apiData)
    let [apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "photoErr", "photo-1")
    const uploadedImageURL = apiRes.data.image_url

    // TODO:
    // Upload Bank Photo
    // let apiData = new FormData()
    // apiData.append("image", {
    //   uri: dataPayment.savingBook.uri,
    //   name: "mitrabank.jpg",
    //   type: "image/jpeg",
    // })
    // let apiPromise = axios.post("uploadimage/mitrabank", apiData)
    // let [apiRes, apiErr] = await asyncHandle(apiPromise)
    // if (apiErr) return errorHandler(apiErr, "photoErr", "photo-1")

    const sendOptions = { params: { mitraId: mitraId } }
    const sendData = {
      mitraId: mitraId,
      name: dataProfile.name,
      description: dataProfile.description,
      email: dataProfile.email,
      warungCategory: dataProfile.category,
      phoneNumber: dataProfile.phoneNumber,
      address: dataAddress.address,
      kelurahan: dataAddress.kelurahan,
      kecamatan: dataAddress.kecamatan,
      zipcode: dataAddress.postCode,
      longCoordinate: (dataAddress?.pinMap?.longitude || 0).toString(),
      latCoordinate: (dataAddress?.pinMap?.latitude || 0).toString(),
      coverPict: uploadedImageURL,
    }

    console.log("dataProfile", dataProfile)
    console.log("sendData", sendData)
    console.log("photonya", uploadedImageURL)

    // Add Warung
    const sendPromise = axios.post("warung/add", sendData, sendOptions)
    const [sendResponse, sendErr] = await asyncHandle(sendPromise)
    if (sendErr) return errorHandler(sendErr, "sendErr", "add-1")

    // Add Warung Schedules
    const warungId = sendResponse.data.data.id
    console.log("warungId", warungId)
    for (let i = 0; i < dataWorkHour.length; i++) {
      const schedulePromise = axios.post(
        "warungoperation/add",
        {
          ...dataWorkHour[i],
          warungId: warungId,
          openWarung: dataWorkHour[i]?.openResto || "00:00",
          closeWarung: dataWorkHour[i].closeResto || "00:00",
          isOpen: dataWorkHour[i]?.openResto ? dataWorkHour[i].isOpen : false,
        },
        { params: { mitraId } },
      )
      const [scheduleRes, scheduleErr] = await asyncHandle(schedulePromise)
      if (scheduleErr) {
        return errorHandler(scheduleErr, `scheduleErr [${i}]`, `sch-${i}`)
      }
    }

    // Add Mitra Bank
    const bankData = {
      accountName: dataPayment.name,
      accountNumber: dataPayment.account,
      bankNameId: dataPayment.bank,
      phoneNumber: dataPayment.phoneNumber,
    }
    const bankOptions = { params: { mitraId: mitraId } }
    const bankPromise = axios.post("mitrabank/add", bankData, bankOptions)
    const [bankRes, bankErr] = await asyncHandle(bankPromise)
    if (bankErr) return errorHandler(bankErr, "bankErr", "bank-1")

    const resetPromise = AsyncStorage.removeItem("warungSetupProfile")
    const [resetRes, resetErr] = await asyncHandle(resetPromise)
    if (resetErr) return errorHandler(resetErr, "resetErr", "reset-1")

    console.log("Success Register")
    // dispatch(auth.setSetup({ hasSetup: true }))
    navigationServices.Navigate("warung/setup/success")
    setLoading(false)
  }

  const handleBackPress = () => {
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === "warung/setup/steps"

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

  const restoreFunc = async () => {
    const restorePromise = AsyncStorage.getItem("warungSetupProfile")
    const [restoreData, restoreErr] = await asyncHandle(restorePromise)
    if (restoreErr) return console.log("restoreErr", restoreErr)

    // No stored data before
    if (!restoreData) return false

    const data = JSON.parse(restoreData)
    setDataProfile({ ...dataProfile, ...data?.dataProfile })
    setDataAddress({ ...dataAddress, ...data?.dataAddress })
    setDataWorkHour({ ...dataWorkHour, ...data?.dataWorkHour })
    setDataPayment({ ...dataPayment, ...data?.dataPayment })
  }

  useFocusEffect(
    useCallback(() => {
      restoreFunc()
    }, []),
  )

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
