import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { InputLabel, Button, Text, Divider } from "_atoms"
import { StyleSheet, View, ScrollView } from "react-native"
import { Spaces } from "_styles"
import { navigationServices, asyncHandle } from "_utils"
import { IconName } from "_c_a_icons"
import { LoadingView } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"

const AlamatItem = ({ data, onPress }) => {
  return (
    <>
      <View style={styles.item}>
        <InputLabel text="Alamat Warung" />
        <Text style={styles.itemAddress}>{data.address}</Text>
        <Button
          style={styles.itemButton}
          text="Ubah"
          type="secondary"
          onPress={onPress}
        />
      </View>
      <Divider />
    </>
  )
}

const Alamat = () => {
  const [isFetching, setFetching] = useState(true)
  const [addressList, setAddressList] = useState([])
  const mitraId = useSelector(state => state.authReducer.mitraId)

  const onEditLocation = (value, i) => {
    navigationServices.Navigate("warung/dashboard/edit-alamat", {
      FormAddressData: {
        data: value,
        onValidSubmit: async data => {
          let apiData, apiParams, apiPromise, apiRes, apiErr

          // Get warungId
          apiPromise = axios.get("mitras/showMitra", {
            params: { mitraId: mitraId },
          })
          ;[apiRes, apiErr] = await asyncHandle(apiPromise)
          if (apiErr) return errorHandler(apiErr, "showMitraErr", "mitra-1")
          const warungId = apiRes.data.data.Warung.id

          // Update Warung Profile
          apiParams = { params: { mitraId: mitraId } }
          apiData = {
            address: data.address,
            kelurahan: data.kelurahan,
            kecamatan: data.kecamatan,
            zipode: data.postCode,
            latCoordinate: data.coordinate.latitude.toString(),
            longCoordinate: data.coordinate.longitude.toString(),
          }
          apiPromise = axios.put(
            `warung/update/${warungId}`,
            apiData,
            apiParams,
          )
          ;[apiRes, apiErr] = await asyncHandle(apiPromise)
          if (apiErr) return errorHandler(apiErr, "onEditLocationErr", "edit-1")

          console.log("onEditLocationRes", apiRes.data)

          const newAddressList = [...addressList]
          newAddressList[i] = data
          setAddressList(newAddressList)
          navigationServices.GoBack()
          console.log("Alamat - onValidSubmit: ", data)
        },
      },
    })
  }

  const onAddNewLocation = () => {
    navigationServices.Navigate("warung/dashboard/edit-alamat", {
      FormAddressData: {
        onValidSubmit: data => {
          const newAddressList = [...addressList, data]

          setAddressList(newAddressList)
          navigationServices.GoBack()
          console.log("Alamat - onValidSubmit: ", data)
        },
      },
    })
  }

  // useEffect(() => {
  //   let isMounted = true

  //   setTimeout(() => {
  //     if (isMounted) {
  //       setAddressList([
  //         {
  //           address: "Jl. Gatot Subroto, Jakarta",
  //           kelurahan: "Kelurahan A",
  //           kecamatan: "Kecamatan B",
  //           postCode: "55281",
  //           coordinate: {
  //             latitude: -7.76645953,
  //             longitude: 110.40190905,
  //           },
  //         },
  //         {
  //           address: "Jl. Ahmad Yani, Bekasi",
  //           kelurahan: "Kelurahan X",
  //           kecamatan: "Kecamatan Y",
  //           postCode: "12345",
  //           coordinate: {
  //             latitude: -7.76947856,
  //             longitude: 110.40522963,
  //           },
  //         },
  //       ])
  //       setFetching(false)
  //     }
  //   }, 775)

  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

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
    navigationServices.GoBack()
    return false
  }

  const fetchAddress = async () => {
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
    if (apiErr) return errorHandler(apiErr, "fetchAddressErr", "fetch-1")
    const profile = apiRes.data.data.warung

    const dataMapping = {
      address: profile.address,
      kelurahan: profile.kelurahan,
      kecamatan: profile.kecamatan,
      postCode: profile.zipcode,
      coordinate: {
        latitude: parseFloat(profile.latCoordinate),
        longitude: parseFloat(profile.longCoordinate),
      },
    }

    setFetching(false)
    setAddressList([dataMapping])
    // console.log("dataMapping", dataMapping)
  }

  useFocusEffect(
    useCallback(() => {
      fetchAddress()
    }, []),
  )

  if (isFetching) return <LoadingView />

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {addressList.map((value, i) => (
          <AlamatItem
            key={i}
            data={value}
            onPress={onEditLocation.bind(null, value, i)}
          />
        ))}

        {/* <Button text="Tambah Lokasi" size="large" onPress={onAddNewLocation} /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spaces.container,
    marginVertical: 40,
  },
  item: {},
  itemAddress: {
    marginTop: 8,
  },
  itemButton: {
    marginTop: 14,
  },
})

export default Alamat
