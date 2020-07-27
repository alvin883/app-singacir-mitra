import React, { Component, useRef, useState, useEffect } from "react"
import { StyleSheet, Alert, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Input, Button } from "_atoms"
import {
  validation,
  customPropTypes,
  navigationServices,
  objectMap,
} from "_utils"

const DataPassword = ({ onValidSubmit, isLoading: propIsLoading }) => {
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    password: null,
    confPassword: null,
  })
  const [errorState, setErrorState] = useState(objectMap(state, val => null))

  const checkPassword = pass => {
    return validation.validate("password", pass)
  }

  const checkMatch = (pass, confirm) => {
    const isMatch = pass === confirm
    if (!confirm.length) return "Harap masukkan kembali password"
    if (!isMatch) return "Password tidak sama, Silahkan masukkan ulang"
    return null
  }

  const onSubmit = () => {
    const errorPassword = checkPassword(state.password)
    const errorConfPassword = checkMatch(state.password, state.confPassword)
    const isNotValid = errorPassword || errorConfPassword

    if (isNotValid) {
      setErrorState({
        password: errorPassword,
        confPassword: errorConfPassword,
      })
      return false
    }

    setLoading(true)
    console.log("onSubmit", { password: state.password })
    onValidSubmit({ password: state.password })
  }

  useEffect(() => {
    setLoading(propIsLoading)
  }, [propIsLoading])

  return (
    <>
      <Input
        style={{ marginTop: 40 }}
        label="Kata Sandi"
        placeholder="Password baru anda ..."
        secureTextEntry={true}
        editable={!isLoading}
        status={errorState.password ? "error" : "normal"}
        warning={errorState.password}
        value={state.password}
        onChangeText={text => {
          setState({
            ...state,
            password: text,
          })
          setErrorState({
            ...errorState,
            password: checkPassword(text),
          })
        }}
      />

      <Input
        style={{ marginTop: 26 }}
        label="Konfirmasi Kata Sandi"
        placeholder="Password baru anda ..."
        secureTextEntry={true}
        editable={!isLoading}
        status={errorState.confPassword ? "error" : "normal"}
        warning={errorState.confPassword}
        value={state.confPassword}
        onChangeText={text => {
          setState({
            ...state,
            confPassword: text,
          })
          setErrorState({
            ...errorState,
            confPassword: checkMatch(state.password, text),
          })
        }}
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
