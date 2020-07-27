import React, { useEffect, useState, useCallback } from "react"
import { StepProfile } from "./Setup"
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices, asyncHandle } from "_utils"
import axios from "axios"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { roleName_api } from "../../types/role"
import qs from "querystring"

const Profile = () => {
  const [data, setData] = useState(sample.RestoProfile)
  const [isLoading, setLoading] = useState(true)
  const authState = useSelector(state => state.authReducer)
  const token = authState.token
  const mitraId = authState.mitraId
  // console.log(authState)

  const onSubmit = data => {
    setData(data)
    console.log("onSubmit, data: ", data)

    // TODO: API call
    setTimeout(() => {
      navigationServices.GoBack()
    }, 1000)
  }

  const fetchProfile = async () => {
    const mitraParams = { params: { mitraId: mitraId } }
    const mProfilePromise = axios.get("mitras/showMitra", mitraParams)
    const [mProfileRes, mProfileErr] = await asyncHandle(mProfilePromise)
    if (mProfileErr){
      setLoading(false)
      return alert("Terjadi kesalahan")
    }

    const restoId = mProfileRes.data.data.Resto.id
    console.log("restoId", restoId)

    const fetchData = { restoId: restoId }
    const fetchHeader = {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    // console.log("fetchData", fetchData)
    // console.log("token", token)
    const fetchPromise = axios({
      method: "get",
      url: `resto/showById?mitraId=${mitraId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({ restoId: restoId }),
    })

    // const fetchPromise = axios.get("resto/showById", {
    //   headers: fetchHeader,
    //   ...mitraParams,
    //   data: qs.stringify(fetchData),
    //   body: qs.stringify(fetchData)
    // })
    const [fetchRes, fetchErr] = await asyncHandle(fetchPromise)
    if (fetchErr) {
      //   console.log("fetchErr", fetchErr)
      console.log("fetchErr", fetchErr.response.data)
      //   console.log("fetchErr", fetchErr.response)
      setLoading(false)
      return alert("Terjadi kesalahan" + restoId + mitraId)
    }

    const profile = fetchRes.data.data
    const mapping = {
      name: profile.name,
      description: profile.description,
      email: profile.email,
      category: profile.restoCategory,
      phoneNumber: mProfileRes.data.data.phoneNumber,
      coverPhoto: null,
    }

    console.log("fetchRes", fetchRes)
    setData(mapping)
  }

  // useEffect(() => {
  //   let isMounted = true
  //   if (isMounted) fetchProfile()

  //   // TODO: API call
  //   // setTimeout(() => {
  //   //   console.log("useEffect, isMounted: ", isMounted)

  //   //   if (isMounted) {
  //   //     // Example
  //   //     setData(sample.RestoProfile)
  //   //     setLoading(false)
  //   //   }
  //   // }, 775)

  //   // To prevent update in unmounted component
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  useFocusEffect(
    useCallback(() => {
      fetchProfile()
    }, []),
  )

  return isLoading ? (
    <View style={styles.wrapperLoading}>
      <ActivityIndicator color={Colors.brandPrimary} size="large" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.wrapper}>
        <StepProfile
          data={data}
          isFirstSetup={false}
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
