import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Text } from "_atoms"
import { FormOwnerData, LoadingView } from "_organisms"
import { Spaces, Colors } from "_styles"
import { cardIdentity } from "_types"
import { navigationServices, asyncHandle } from "_utils"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"

const DataPribadi = () => {
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [data, setData] = useState()
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
    let apiParams = { params: { mitraId: mitraId } }
    let apiData = {
      fullname: data.name,
      phoneNumber: data.phoneNumber,
    }
    let apiPromise = axios.put("mitras/update-profile", apiData, apiParams)
    let [apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "onSubmitErr", "update-1")

    Alert.alert("Sukses", "Data Pribadi anda berhasil di perbaharui", [
      {
        text: "Oke",
        onPress: navigationServices.GoBack(),
      },
    ])
  }

  const fetchProfile = async () => {
    let apiPromise, apiRes, apiErr

    apiPromise = axios.get("mitras/showMitra", { params: { mitraId: mitraId } })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "fetchProfileErr", "fetch-1")
    const profile = apiRes.data.data

    const dataMapping = {
      name: profile.fullname,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      identityType: profile.cardId,
      identityNumber: profile.cardNumber,
      identityPhoto: profile.cardPict,
    }

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
        <FormOwnerData
          isFirstSetup={false}
          isLoading={isLoading}
          data={data}
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapperFetching: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default DataPribadi
