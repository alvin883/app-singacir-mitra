import React, { Component, useRef, useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Button, Input } from "_atoms"
import { Spaces, Colors, FontFamily } from "_styles"
import { LogoGoogle, LogoFacebook } from "_c_a_icons"
import logo from "_assets/images/logo.png"
import AsyncStorage from "@react-native-community/async-storage"
import { auth } from "_actions"
import { useDispatch } from "react-redux"
import {
  navigationServices,
  hexToRgb,
  validation,
  asyncHandle,
  apiHelpers,
} from "_utils"
import { role } from "_types"
import axios from "axios"
import { role_api, roleName_api } from "../../types/role"
import JwtDecode from "jwt-decode"

const Login = ({ navigation }) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    email: "",
    emailWarning: "",
    password: "",
    passwordWarning: "",
  })
  const [errorState, setErrorState] = useState({ email: null, password: null })

  const checkEmail = (str = state.email) => {
    return validation.validate("email", str)
  }

  const checkPassword = (str = state.password) => {
    return validation.validate("loginPassword", str)
  }

  // Reset all error state when Login screen is not active (navigation change)
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("blur", () => {
      setState({
        ...state,
        email: "",
        emailWarning: "",
        password: "",
        passwordWarning: "",
      })
      // setErrorState({
      //   email: null,
      //   password: null,
      // })
    })

    return () => unsubscribeFocus
  }, [navigation])

  const getRole = () =>
    axios
      .get("mitras/showMitra", {
        params: { mitraId: data.mitraId },
      })
      .then(response => {
        const data = response.data.data
        const businessId = data.businessId
        const myRole = role_api[businessId]
        return myRole
      })

  const clickLogin = async () => {
    const { email, password } = state
    const errorEmail = validation.validate("email", email)
    const errorPassword = validation.validate("loginPassword", password)

    if (errorEmail || errorPassword) {
      setState({
        ...state,
        emailWarning: errorEmail,
        passwordWarning: errorPassword,
      })
      return false
    }

    setLoading(true)
    setState({
      ...state,
      emailWarning: "",
      passwordWarning: "",
    })

    function onError(error) {
      setLoading(false)

      if (error) {
        console.log(error)
        // console.log(error?.response)
        // console.log(error?.request)
      }

      if (error?.response?.data?.message) {
        if (error.response.data.message == "User password is invalid") {
          return alert("User atau password anda salah")
        } else if (typeof error.response.data.message == "string") {
          return alert(error.response.data.message)
        } else if (error.response.data.message === "User email not found") {
          return alert("Email tidak terdaftar")
        } else {
          return alert(error.response.data.message)
        }
      }

      alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
      return false
    }

    function onErrorSetToken(err) {
      console.log(err)
      setLoading(false)
      alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
      return false
    }

    const loginURL = "auth/loginMitra"
    const loginData = { email: state.email, password: state.password }

    // API login
    const loginPromise = axios.post(loginURL, loginData)
    const [loginRes, loginErr] = await asyncHandle(loginPromise)
    if (loginErr) return onError(loginErr)

    const token = loginRes.data.data
    const data = JwtDecode(token)
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

    // Mitra Role
    // const roleParams = { mitraId: data.mitraId }
    // console.log("roleParams", roleParams)
    // const rolePromise = axios.get("mitras/showMitra", { params: roleParams })
    const mitraInfoPromise = apiHelpers.fetchRole({ mitraId: data.mitraId })
    const [mitraInfoRes, mitraInfoErr] = await asyncHandle(mitraInfoPromise)
    if (mitraInfoErr) return onError(null)

    const mitraInfo = mitraInfoRes.data.data
    const mitraRole = mitraInfo.Business.id
    const mitraRoleName = roleName_api[mitraRole]
    const mitraHasSetup = mitraInfo[mitraRoleName]?.id ? true : false

    // console.log("token: ", token)
    // console.log("data: ", data)
    // console.log("mitraRole: ", mitraRole)

    // Save to async storage
    // const setTokenPromise = AsyncStorage.setItem("token", token)
    const setTokenPromise = AsyncStorage.multiSet([
      ["token", token],
      ["mitraRole", mitraRole.toString()],
    ])
    const [setTokenRes, setTokenErr] = await asyncHandle(setTokenPromise)
    if (setTokenErr) return onErrorSetToken(setTokenErr)

    data.token = token
    data.role = mitraRole
    data.hasSetup = mitraHasSetup

    console.log("Login.js - mitraRole", mitraRole)
    dispatch(auth.login(data))
  }

  const clickGoogle = () => {
    if (isLoading) return false
    console.log("Google Login")
  }

  const clickFacebook = () => {
    if (isLoading) return false
    console.log("Facebook Login")
  }

  const clickSignup = () => {
    if (isLoading) return false
    navigationServices.Navigate("Daftar")
  }

  const clickForgot = () => {
    if (isLoading) return false
    navigationServices.Navigate("LupaPasswordLanding")
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={logo} style={styles.logo} />
          <Input
            label="Email"
            placeholder="Email anda ..."
            ref={emailRef}
            editable={!isLoading}
            warning={state.emailWarning}
            status={state.emailWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkEmail(text)
              setState({
                ...state,
                email: text,
                emailWarning: warning,
              })
            }}
          />
          <Input
            label="Kata Sandi"
            placeholder="Password anda ..."
            secureTextEntry={true}
            style={styles.input}
            ref={passwordRef}
            editable={!isLoading}
            warning={state.passwordWarning}
            status={state.passwordWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPassword(text)
              setState({
                ...state,
                password: text,
                passwordWarning: warning,
              })
            }}
          />
          <Button
            style={styles.button}
            type="primary"
            size="large"
            text="Login"
            onPress={clickLogin}
            state={isLoading ? "loading" : "default"}
          />
          <Button
            style={styles.buttonForgot}
            type="secondary"
            size="normal"
            text="Lupa password?"
            onPress={clickForgot}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomTitle}>Atau masuk dengan</Text>
          <View style={styles.options}>
            <Button
              style={styles.optionsButton}
              shape="circle"
              IconSVG={LogoGoogle}
              baseColor={Colors.themeLight}
              onPress={clickGoogle}
            />
            <Button
              style={styles.optionsButton}
              shape="circle"
              IconSVG={LogoFacebook}
              baseColor={Colors.themeLight}
              onPress={clickFacebook}
            />
          </View>
          <View style={styles.signup}>
            <Text>Belum punya akun?</Text>
            <Button
              style={styles.signupButton}
              type="nude"
              size="normal"
              text="Daftar Sekarang"
              onPress={clickSignup}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  top: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: Spaces.container,
    backgroundColor: Colors.themeLight,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  buttonForgot: {
    marginTop: 10,
    alignSelf: "center",
  },
  bottom: {
    paddingVertical: 20,
  },
  bottomTitle: {
    alignSelf: "center",
    fontFamily: FontFamily.normal,
  },
  options: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  optionsButton: {
    margin: 6,
  },
  signup: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    marginLeft: 10,
  },
})

export default Login
