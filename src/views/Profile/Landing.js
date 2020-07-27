import React, { Component, useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, StatusBar } from "react-native"
import PropTypes from "prop-types"
import { Divider, Button } from "_atoms"
import { ProfileHeader, ProfileButton, PairTitleValue } from "_molecules"
import { Spaces, Colors } from "_styles"
import {
  convertToCurrency,
  sample,
  navigationServices,
  asyncHandle,
} from "_utils"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "_actions"
import AsyncStorage from "@react-native-community/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { role_api } from "../../types/role"
import { LoadingView } from "_organisms"

const Landing = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const mitraId = useSelector(state => state.authReducer.mitraId)

  const clickEdit = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/edit")
  }

  const clickSaldo = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/balance-history")
  }

  const clickPoint = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/donation")
  }

  const clickDonation = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/donation-history")
  }

  const clickChangePass = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/edit-pass")
  }

  const clickLogout = () => {
    setLoading(true)

    AsyncStorage.removeItem("token")
      .then(() => dispatch(auth.logout(null)))
      .catch(err => {
        setLoading(false)
        console.log(err)
        alert("Terjadi kesalahan saat logout, silahkan coba lagi")
      })
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
    navigationServices.GoBack()
    return false
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const fetchData = async () => {
    let apiPromise, apiRes, apiErr

    // Mitra Profile Data
    apiPromise = axios.get("mitras/showMitra", {
      params: { mitraId: mitraId },
    })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "FetchError", "fetch-1")
    if (!apiRes?.data?.data) {
      return errorHandler("error", "error", null, "Not Found")
    }
    const profile = apiRes.data.data

    // Mitra Balance Data
    apiPromise = axios.get("mitrabalance/showMitraBalance", {
      params: { mitraId: mitraId },
    })
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "BalanceErr", "balance-1")
    if (!apiRes?.data?.data) {
      return errorHandler("error", "error", null, "Not Found")
    }
    const balance = apiRes.data.data

    const dataMapping = {
      name: profile.fullname,
      role: capitalizeFirstLetter(role_api[profile.Business.id]),
      // TODO:
      image: null,
      saldo: parseInt(balance.balance),
      points: parseInt(balance.point),
      // TODO:
      donation: 0,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
    }

    setData(dataMapping)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.themeLight)
      StatusBar.setBarStyle("dark-content")
      fetchData()
    }, []),
  )

  if (isFetching) return <LoadingView />

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <ProfileHeader
          photo={data.image}
          name={data.name}
          role={data.role}
          onClickEdit={clickEdit}
        />

        <Divider style={styles.divider} />

        <View>
          <ProfileButton
            style={{ ...styles.profileButton, marginTop: 0 }}
            title="Kantong Semar"
            value={"Rp " + convertToCurrency(data.saldo, 0, false)}
            actionText="History"
            onClick={clickSaldo}
            colorPreset="secondary"
          />

          <ProfileButton
            style={styles.profileButton}
            title="Points"
            value={convertToCurrency(data.points, 0, false)}
            actionText="Donasi"
            onClick={clickPoint}
          />

          <ProfileButton
            style={styles.profileButton}
            title="Total Donasi Anda"
            value={convertToCurrency(data.donation, 0, false)}
            actionText="History"
            onClick={clickDonation}
          />
        </View>

        <Divider style={styles.divider} />

        <PairTitleValue title="Email" value={data.email} stylePreset="table" />
        <PairTitleValue
          style={{ marginTop: 14 }}
          title="Nomor HP"
          value={data.phoneNumber}
          stylePreset="table"
        />

        <Button
          style={styles.changePassButton}
          type="secondary"
          text="Ubah Kata Sandi"
          size="large"
          onPress={clickChangePass}
        />

        <Button
          style={styles.logoutButton}
          text="Logout"
          size="large"
          onPress={clickLogout}
          state={isLoading ? "loading" : "default"}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
  changePassButton: {
    marginTop: 40,
  },
  profileButton: {
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 10,
  },
})

export default Landing
