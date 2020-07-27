import React, { useEffect, useState, useCallback } from "react"
import { StepProfile } from "./Setup"
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices, asyncHandle } from "_utils"
import { useSelector } from "react-redux"
import axios from "axios"
import { LoadingView, FormMerchantData } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"
import TextData from "./TextData"

const Profile = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const authState = useSelector(state => state.authReducer)
  const token = authState.token
  const mitraId = authState.mitraId

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(`${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`)
    setLoading(false)
    navigationServices.GoBack()
    return false
  }

  const onSubmit = async data => {
    setLoading(true)
    const updateCoverPhoto = data.coverPhoto != originalData.coverPhoto

    let apiData, apiParams, apiPromise, apiRes, apiErr
    let uploadedImageURL = data.coverPhoto

    if (updateCoverPhoto) {
      // Upload and update cover image
      apiData = new FormData()
      apiData.append("image", {
        uri: dataProfile.coverPhoto.uri,
        name: "warungCoverPhoto.jpg",
        type: "image/jpeg",
      })
      apiPromise = axios.post("uploadimage/warung", apiData)
      ;[apiRes, apiErr] = await asyncHandle(apiPromise)
      if (apiErr) return errorHandler(apiErr, "photoErr", "photo-1")
      uploadedImageURL = apiRes.data.image_url
    }

    // Update profile
    apiParams = { params: { mitraId: mitraId } }
    apiData = {
      name: data.name,
      description: data.description,
      email: data.email,
      warungCategory: data.category,
      phoneNumber: data.phoneNumber,
      coverPict: uploadedImageURL,
    }
    apiPromise = axios.put(`warung/update/${data.id}`, apiData, apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "updateErr", "update-1")
    console.log("apires-PUT", apiRes.data)

    Alert.alert("Sukses", "Warung anda berhasil di perbaharui", [
      {
        text: "Oke",
        onPress: navigationServices.GoBack(),
      },
    ])
  }

  const fetchProfile = async () => {
    let apiPromise, apiRes, apiErr

    // Get warungId
    apiPromise = axios.get("mitras/showMitra", { params: { mitraId: mitraId } })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "showMitraErr", "mitra-1")
    const warungId = apiRes.data.data.Warung.id

    // Warung Profile
    apiPromise = axios.get("warung/showWarungProfile", {
      params: { warungId: warungId },
    })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "fetchWarungErr", "fetch-1")
    const profile = apiRes.data.data.warung

    const dataMapping = {
      id: profile.id,
      name: profile.name,
      description: profile.description,
      email: profile.email,
      category: profile.warungCategory,
      phoneNumber: profile.phoneNumber,
      coverPhoto: profile.coverPict,
    }

    setOriginalData(dataMapping)
    setData(dataMapping)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfile()
    }, []),
  )

  if (isFetching) return <LoadingView />

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormMerchantData
          data={data}
          text={TextData.FormMerchantDataText}
          isFirstSetup={false}
          isLoading={isLoading}
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapperLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default Profile
