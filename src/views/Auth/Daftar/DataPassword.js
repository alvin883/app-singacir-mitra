import React, { Component, useRef, useState, useEffect } from "react"
import { StyleSheet, Alert, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Input, Button } from "_atoms"
import { validation, customPropTypes, navigationServices } from "_utils"

const DataPassword = () => {
  const passwordRef = useRef()
  const confPasswordRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState({ password: null, confPassword: null })

  const onSubmit = () => {
    const password = passwordRef.current.state.text
    const confPassword = confPasswordRef.current.state.text

    // Validation
    const vPassword = validation.validate("password", password)
    const isMatch = confPassword === password
    let vConfPassword = null

    if (!vPassword && !confPassword.length) {
      // User filled password field but confirmation password is empty
      vConfPassword = "Harap masukkan kembali password"
    } else if (!isMatch) {
      // Password and confirmation field is not match
      vConfPassword = "Password tidak sama, Silahkan masukkan ulang"
    }

    // If everything doen't have an error, then it's all valid => true
    const isValid = !vPassword && !vConfPassword

    console.log("onSubmit")
    setLoading(true)

    if (!isValid) {
      setError({ password: vPassword, confPassword: vConfPassword })
      return setLoading(false)
    }

    setTimeout(() => {
      // When registration done
      setError({ password: null, confPassword: null })
      setLoading(false)
      Alert.alert(
        "Success",
        "Berhasil membuat akun mitra, silahkan login dengan akun baru anda",
        [{ text: "Oke", onPress: () => navigationServices.Navigate("Login") }],
      )
    }, 775)
  }

  const handleBackpress = () => {
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === "Daftar"

    console.log("DataPassword BackHandler, isLoading: ", isLoading)

    /**
     * Check whether this event occur when screen is still active or not,
     * Why you need check this? don't it handled by componentWillUnmount?
     * No, componentWillUnmount will take some times to trigger due to the
     * sliding transition each screen, so componentWillUnmout will not be
     * triggered imediately
     */
    if (!isActiveScreen) return false

    // Allow back behaviour when it's not loading
    if (!isLoading) return false

    // You need to return true
    // in order to prevent back button
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackpress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackpress)
    }
  })

  return (
    <>
      <Input
        style={{ marginTop: 40 }}
        label="Kata Sandi"
        placeholder="Password baru anda ..."
        secureTextEntry={true}
        status={error.password ? "error" : "normal"}
        editable={!isLoading}
        ref={passwordRef}
        warning={error.password}
      />

      <Input
        style={{ marginTop: 26 }}
        label="Konfirmasi Kata Sandi"
        placeholder="Password baru anda ..."
        secureTextEntry={true}
        status={error.confPassword ? "error" : "normal"}
        editable={!isLoading}
        ref={confPasswordRef}
        warning={error.confPassword}
      />

      <Button
        style={{ marginTop: 40 }}
        text="Selesai"
        type="primary"
        size="large"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </>
  )
}

export default DataPassword
