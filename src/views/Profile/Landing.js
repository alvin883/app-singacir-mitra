import React, { Component, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Divider, Button } from "_atoms"
import { ProfileHeader, ProfileButton, PairTitleValue } from "_molecules"
import { Spaces } from "_styles"
import { convertToCurrency, sample, navigationServices } from "_utils"
import { useDispatch } from "react-redux"
import { auth } from "_actions"
import AsyncStorage from "@react-native-community/async-storage"

const Landing = () => {
  const dispatch = useDispatch()
  const data = sample.Profile
  const [isLoading, setIsLoading] = useState(false)

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
    alert("History Donasi")
  }

  const clickChangePass = () => {
    if (isLoading) return false
    navigationServices.Navigate("profile/edit-pass")
  }

  const clickLogout = () => {
    setIsLoading(true)

    AsyncStorage.removeItem("user")
      .then(() => dispatch(auth.logout(null)))
      .catch(err => {
        setIsLoading(false)
        console.log(err)
        alert("Terjadi kesalahan saat logout, silahkan coba lagi")
      })
  }

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
            value={"Rp " + convertToCurrency(data.saldo)}
            actionText="History"
            onClick={clickSaldo}
            colorPreset="secondary"
          />

          <ProfileButton
            style={styles.profileButton}
            title="Points"
            value={convertToCurrency(data.points)}
            actionText="Donasi"
            onClick={clickPoint}
          />

          <ProfileButton
            style={styles.profileButton}
            title="Total Donasi Anda"
            value={convertToCurrency(data.donation)}
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
