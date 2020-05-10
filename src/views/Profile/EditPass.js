import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import PropTypes from "prop-types"
import { Avatar, Button, Input, Text, Content } from "_atoms"
import { sample, navigationServices, validation } from "_utils"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"

const EditPass = () => {
  /**
   * State management
   */
  const [state, setState] = useState({
    isChanging: false,
    password: "",
    newPassword: "",
    newPasswordWarning: "",
    confirmPassword: "",
  })

  /**
   * Submit button visual state
   */
  const buttonState = state.isChanging ? "loading" : "default"

  const handleNewPassword = text => {
    const validate = validation.validate("password", text)

    console.log("handleNewPassword: ", validate, text)

    setState({
      ...state,
      newPasswordWarning: validate,
      newPassword: text,
    })
  }

  /**
   * Validate the new password on Front-End side
   *
   * 1. NewPass and ConfirmPass should be filled
   * 2. NewPass and ConfirmPass shold at least 6 chars
   * 3. NewPass and ConfirmPass shold be the same
   *
   * @param {Object} param
   * @param {String} param.pass The new password
   * @param {String} param.confirm The confirmed version of new password
   * @returns {boolean}
   */
  const validateNewPassword = ({ pass, confirm }) => {
    const isFilled = pass.length > 0 && confirm.length > 0
    const validLength = pass.length > 6 && confirm.length > 6
    const isSame = pass === confirm

    if (isFilled && !validLength) {
      return false
    }

    return isFilled && validLength && isSame
  }

  const sendAPI = () => {
    const isValid = validateNewPassword({
      pass: state.newPassword,
      confirm: state.confirmPassword,
    })
    console.log("sendAPI: sending request ...")

    setTimeout(() => {
      onSuccess()
    }, 1000)
  }

  const onSuccess = () => {
    setState({
      ...state,
      isChanging: false,
    })

    Alert.alert("Success", "Password anda telah berhasil diubah!", [
      {
        text: "Oke",
        onPress: () => navigationServices.Navigate("profile/landing"),
      },
    ])
  }

  const onError = () => {
    setState({
      ...state,
      isChanging: false,
    })

    Alert.alert("Error", "Terjadi kesalahan, silahkan coba kembali!", [
      { text: "Oke" },
    ])
  }

  const onCancel = () => navigationServices.GoBack()

  const onSubmit = () => {
    setState({
      ...state,
      isChanging: true,
    })
    sendAPI()
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            posuere placerat lorem, in molestie odio vehicula.
          </Content>
        </View>

        <View style={styles.form}>
          <Input
            style={{ ...styles.input, marginTop: 0 }}
            label="Kata Sandi"
            placeholder="Masukkan Kata Sandi lama ..."
            secureTextEntry={true}
            onChangeText={text =>
              setState({
                ...state,
                password: text,
              })
            }
          />

          <Input
            style={styles.input}
            label="Kata Sandi Baru"
            placeholder="Kata Sandi baru anda ..."
            warning={state.newPasswordWarning}
            status={state.newPasswordWarning ? "error" : "normal"}
            secureTextEntry={true}
            onChangeText={handleNewPassword}
          />

          <Input
            style={styles.input}
            label="Konfirmasi Kata Sandi Baru"
            placeholder="Kata Sandi baru anda ..."
            secureTextEntry={true}
            onChangeText={text =>
              setState({
                ...state,
                confirmPassword: text,
              })
            }
          />
        </View>

        <View style={styles.action}>
          <Button
            style={styles.actionButton}
            type="secondary"
            text="Batal"
            size="large"
            onPress={onCancel}
          />
          <Button
            style={styles.actionButton}
            text="Simpan"
            size="large"
            onPress={onSubmit}
            state={buttonState}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
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

export default EditPass
