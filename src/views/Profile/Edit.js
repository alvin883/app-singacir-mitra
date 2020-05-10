import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Avatar, Button, Input } from "_atoms"
import { sample, navigationServices } from "_utils"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"

const Edit = () => {
  const data = sample.Profile
  const onClickChangeAvatar = () => alert("Change Avatar")
  const onClickChangePass = () =>
    navigationServices.Navigate("profile/edit-pass")
  const onClickCancel = () => navigationServices.GoBack()
  const onClickSubmit = () => alert("Submit")

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Avatar
            style={styles.avatar}
            imageStyle={styles.avatar}
            source={data.image}
            name={data.name}
          />
          <Button
            style={styles.changeAvatar}
            text="Ubah Foto"
            type="secondary"
            onPress={onClickChangeAvatar}
          />
        </View>

        <View style={styles.form}>
          <Input
            style={{ ...styles.input, marginTop: 0 }}
            label="Nama Lengkap"
            placeholder="Nama lengkap anda ..."
            value={data.name}
          />

          <Input
            style={styles.input}
            label="Email"
            placeholder="Email anda ..."
            keyboardType="email-address"
            value={data.email}
          />

          <Input
            style={styles.input}
            label="Nomor HP"
            placeholder="Nomor HP anda ..."
            keyboardType="phone-pad"
            value={data.phoneNumber}
          />

          <Button
            style={styles.changePass}
            text="Ubah kata sandi"
            type="secondary"
            iconName={IconName.chevronRight}
            iconPosition="right"
            onPress={onClickChangePass}
          />
        </View>

        <View style={styles.action}>
          <Button
            style={styles.actionButton}
            text="Batal"
            type="secondary"
            size="large"
            onPress={onClickCancel}
          />
          <Button
            style={styles.actionButton}
            text="Simpan"
            size="large"
            onPress={onClickSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 40,
    marginHorizontal: Spaces.container,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 80,
    width: 80,
  },
  changeAvatar: {
    alignSelf: "auto",
    marginTop: 14,
  },
  form: {
    marginTop: 30,
  },
  input: {
    marginTop: 26,
  },
  changePass: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  action: {
    marginTop: 40,
    marginHorizontal: -4,
    flexDirection: "row",
  },
  actionButton: {
    flex: 0.5,
    marginHorizontal: 4,
  },
})

export default Edit
