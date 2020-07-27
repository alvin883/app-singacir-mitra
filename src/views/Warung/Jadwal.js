import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { FormWorkHour, LoadingView } from "_organisms"
import { Spaces } from "_styles"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"
import { asyncHandle, navigationServices } from "_utils"

const Jadwal = () => {
  const [isFetched, setFetched] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [dataWorkHour, setDataWorkHour] = useState([])
  const mitraId = useSelector(state => state.authReducer.mitraId)
  const [warungId, setWarungId] = useState()

  const onSubmit = async data => {
    setLoading(true)
    const dataWorkHour = data
    // console.log("Jadwal - FormWorkHour: ", data)

    // Add Warung Schedules
    for (let i = 0; i < dataWorkHour.length; i++) {
      console.log("shitAwal", dataWorkHour[i])
      const apiPromise = axios.post(
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
      const [apiRes, apiErr] = await asyncHandle(apiPromise)
      if (apiErr) return errorHandler(apiErr, `scheduleErr [${i}]`, `sch-${i}`)
      // console.log("warungoperation", apiRes.data.data)
    }

    setLoading(false)
    Alert.alert("Sukses", "Jadwal warung anda berhasil di perbaharui", [
      {
        text: "Oke",
        onPress: navigationServices.GoBack(),
      },
    ])
  }

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(`${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`)
    setFetching(false)
    // navigationServices.GoBack()
    return false
  }

  const fetchSchedule = async () => {
    let apiParams, apiPromise, apiRes, apiErr

    // Get warungId
    apiPromise = axios.get("mitras/showMitra", { params: { mitraId: mitraId } })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "showMitraErr", "mitra-1")
    const warungId = apiRes.data.data.Warung.id
    setWarungId(warungId)

    // Warung Profile
    apiParams = { params: { warungId: warungId } }
    apiPromise = axios.get("warung/showWarungProfile", apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "fetchScheduleErr", "schedule-1")
    const profile = apiRes.data.data

    const operational = profile.operational
    const dataMapping = operational.map((val, i) => ({
      day: val.day,
      openResto: val.openWarung,
      closeResto: val.closeWarung,
      isOpen: val.isOpen,
    }))

    console.log("datampaaing", dataMapping)
    setDataWorkHour(dataMapping)
    setFetching(false)
    setFetched(true)
  }

  useFocusEffect(
    useCallback(() => {
      if (!isFetched) fetchSchedule()
    }, [isFetched]),
  )

  if (isFetching) return <LoadingView />

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormWorkHour
          data={dataWorkHour}
          isFirstSetup={false}
          isLoading={isLoading}
          editRouteName="warung/dashboard/edit-jadwal"
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default Jadwal
