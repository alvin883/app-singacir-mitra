import React, { Component, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces } from "_styles"
import { Stepper } from "_atoms"
import { navigationServices, asyncHandle } from "_utils"
import DataPribadi from "./DataPribadi"
import DataUsaha from "./DataUsaha"
import DataPassword from "./DataPassword"
import { useState } from "react"
import { FormOwnerData } from "_organisms"
import axios from "axios"

const Daftar = () => {
  const [step, setStep] = useState(0)
  const [dataUsaha, setDataUsaha] = useState(undefined)
  const [dataPribadi, setDataPribadi] = useState(undefined)
  const [dataPassword, setDataPassword] = useState(undefined)
  const [isLoading, setLoading] = useState(undefined)

  const stepComponents = [
    <DataUsaha
      data={dataUsaha}
      onValidSubmit={data => {
        setStep(step + 1)
        setDataUsaha(data)
      }}
    />,
    <FormOwnerData
      data={dataPribadi}
      onValidSubmit={data => {
        setStep(step + 1)
        setDataPribadi(data)
      }}
    />,
    <DataPassword
      // data={dataPassword}
      isLoading={isLoading}
      onValidSubmit={data => {
        // setDataPassword(data)
        setLoading(true)
        onSubmit({
          dataUsaha: dataUsaha,
          dataPribadi: dataPribadi,
          dataPassword: data,
        })
      }}
    />,
  ]

  const errorHandler = (err, titleLog = "Steps Error", errorCodeLog = "") => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data?.message)
    if (err?.response?.data) {
      alert(err.response.data.message)
    } else {
      alert(
        `Terjadi kesalahan, silahkan coba beberapa saat lagi${
          errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``
        }`,
      )
    }
    setLoading(false)
    return false
  }

  const onSubmit = async ({ dataUsaha, dataPribadi, dataPassword }) => {
    const registerMapping = {
      fullname: dataPribadi.name,
      password: dataPassword.password,
      email: dataPribadi.email,
      phoneNumber: dataPribadi.phoneNumber,
      cardId: dataPribadi.identityType.value,
      cardNumber: dataPribadi.identityNumber,
      // cardPict: dataPribadi.identityPhoto,
      businessName: dataUsaha.name,
      businessId: dataUsaha.business,
    }

    console.log(registerMapping)

    const registerPromise = axios.post("mitras/register", registerMapping)
    const [registerRes, registerErr] = await asyncHandle(registerPromise)
    if (registerErr) return errorHandler(registerErr)

    setLoading(false)
    console.log("registerRes", registerRes)
    console.log("registerRes", registerRes.data.data)
    Alert.alert(
      "Success",
      "Berhasil membuat akun mitra, silahkan login dengan akun baru anda",
      [{ text: "Oke", onPress: () => navigationServices.Navigate("Login") }],
    )
  }

  const handleBackPress = () => {
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === "Daftar"

    /**
     * Check whether this event occur when screen is still active or not,
     * Why you need check this? don't it handled by componentWillUnmount?
     * No, componentWillUnmount will take some times to trigger due to the
     * sliding transition each screen, so componentWillUnmout will not be
     * triggered imediately
     */
    if (!isActiveScreen) return false

    if (step > 0) {
      if (!isLoading) {
        // Back one step
        setStep(step - 1)
      }

      // You need to return true
      // in order to prevent back button
      return true
    } else {
      // Back to previous screen
      return false
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  })

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Stepper total={stepComponents.length} current={step + 1} />
        </View>
        <View style={styles.bottom}>{stepComponents[step]}</View>
      </View>
    </ScrollView>
  )
}

// class Daftar extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       current: 0,
//     }
//   }

//   componentDidMount() {
//     this.backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       this.handleBackpress,
//     )
//   }

//   componentWillUnmount() {
//     this.backHandler.remove()
//   }

//   handleBackpress = () => {
//     const { current } = this.state
//     const currentRouteName = navigationServices.CurrentRouteName()
//     const isActiveScreen = currentRouteName === "Daftar"

//     /**
//      * Check whether this event occur when screen is still active or not,
//      * Why you need check this? don't it handled by componentWillUnmount?
//      * No, componentWillUnmount will take some times to trigger due to the
//      * sliding transition each screen, so componentWillUnmout will not be
//      * triggered imediately
//      */
//     if (!isActiveScreen) return false

//     if (current > 0) {
//       // Back one step
//       this.setState(prevState => ({ current: prevState.current - 1 }))
//     } else {
//       // Back to previous screen
//       this.props.navigation.goBack()
//     }

//     // You need to return true
//     // in order to prevent back button
//     return true
//   }

//   onNext = () => {
//     console.log("click")
//     this.setState(prevState => ({
//       current: prevState.current + 1,
//     }))
//   }

//   render() {
//     const { current } = this.state
//     const steps = [
//       <DataUsaha onNext={data => {
//         set
//       }} />,
//       <DataPribadi onNext={this.onNext} />,
//       <DataPassword onValidSubmit={} />,
//     ]

//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.top}>
//             <Stepper total={steps.length} current={current + 1} />
//           </View>
//           <View style={styles.bottom}>{steps[current]}</View>
//         </View>
//       </ScrollView>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spaces.container,
  },
  top: {
    marginTop: 20,
  },
  bottom: {
    marginBottom: 40,
  },
})

export default Daftar
