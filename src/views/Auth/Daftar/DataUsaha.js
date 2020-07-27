import PropTypes from "prop-types"
import React, { Component, useCallback, useEffect } from "react"
import { PermissionsAndroid, StyleSheet, Text, Linking } from "react-native"
import ImagePicker from "react-native-image-picker"
import {
  Button,
  Input,
  InputPhoto,
  InputSelect,
  Checkbox,
  Content,
  Heading,
  Infobox,
} from "_atoms"
import { FontSizes, Colors } from "_styles"
import { useState } from "react"
import { role } from "_types"
import { useFocusEffect } from "@react-navigation/native"
import { objectMap, validation, hexToRgb, asyncHandle } from "_utils"
import Axios from "axios"
import { LoadingView } from "_organisms"

const BUSINESS_OPTIONS = role.RESTO

const Second = ({
  onValidSubmit,
  isLoading: propIsLoading,
  data: defaultVal,
}) => {
  const [businessList, setBusinessList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [state, setState] = useState({
    name: defaultVal.name,
    business: defaultVal.business,
    isAgree: defaultVal.isAgree,
  })
  const [errorState, setErrorState] = useState(objectMap(state, val => null))

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkFilled = value => {
    if (!value) return "Kolom ini tidak boleh kosong"
    return null
  }

  const onChangeIsAgree = () => {
    const newVal = !state.isAgree
    setState({
      ...state,
      isAgree: newVal,
    })
    setErrorState({
      ...errorState,
      isAgree: checkFilled(newVal),
    })
  }

  const onSubmit = () => {
    const data = state
    const errorName = checkExistField(state.name)
    const errorBusiness = checkFilled(state.business)
    const errorIsAgree = checkFilled(state.isAgree)
    const isNotValid = errorName || errorBusiness || errorIsAgree

    if (isNotValid) {
      setErrorState({
        ...errorState,
        name: errorName,
        business: errorBusiness,
        isAgree: errorIsAgree,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
  }

  const fetchOptions = async () => {
    const fetchPromise = Axios.get("business/showAll")
    const [fetchRes, fetchErr] = await asyncHandle(fetchPromise)
    if (fetchErr) {
      return alert("Terjadi kesalahan")
    }

    const options = fetchRes.data.data
    const mapping = options.map(val => ({
      label: val.type == "Driver" ? "Motoris" : val.type,
      value: val.id.toString(),
    }))
    console.log()
    setBusinessList(mapping)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchOptions()
    }, []),
  )

  useEffect(() => {
    setLoading(propIsLoading)
  }, [propIsLoading])

  if (isFetching) return <LoadingView style={styles.loading} />

  return (
    <>
      <Heading text="Data Usaha" size="3" style={styles.heading} />

      <Input
        style={{ ...styles.input, marginTop: 20 }}
        label="Nama Usaha"
        placeholder="Nama usaha anda ..."
        value={state.name}
        warning={errorState.name}
        status={errorState.name ? "error" : "normal"}
        onChangeText={text => {
          const warning = checkExistField(text)
          setState({
            ...state,
            name: text,
          })
          setErrorState({
            ...errorState,
            name: warning,
          })
        }}
      />

      <InputSelect
        style={styles.input}
        label="Jenis Usaha"
        placeholder="Pilih jenis usaha anda"
        options={businessList}
        value={state.business}
        onSelect={val => {
          setState({
            ...state,
            business: val,
          })
          setErrorState({
            ...errorState,
            business: null,
          })
        }}
      />

      {errorState.business && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          {errorState.business}
        </Infobox>
      )}

      <Checkbox
        style={styles.terms}
        onPress={onChangeIsAgree}
        checked={state.isAgree}
        clickableChildren={false}>
        <Content>
          Saya telah membaca dan setuju dengan{"\n"}
          <Text
            style={styles.termsLink}
            onPress={() => {
              Linking.openURL("http://www.example.com/")
            }}>
            Syarat dan Ketentuan
          </Text>{" "}
          yang berlaku
        </Content>
      </Checkbox>

      {errorState.isAgree && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          Anda harus menyetujui kolom ini terlebih dahulu
        </Infobox>
      )}

      <Button
        style={styles.button}
        text="Selanjutnya"
        type="primary"
        size="large"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </>
  )
}

Second.defaultProps = {
  data: {
    name: null,
    business: null,
    isAgree: false,
  },
}

// class Second extends Component {
//   static propTypes = {
//     onNext: PropTypes.func,
//   }

//   static defaultProps = {
//     onNext: () => {},
//   }

//   state = {
//     valueType: null,
//     indexType: null,
//     optionsType: [
//       { label: "Motoris", value: "motoris" },
//       { label: "Resto", value: "resto" },
//       { label: "Warung", value: "warung" },
//       { label: "Pedagang Keliling", value: "pedagang" },
//     ],
//     checkbox: false,
//   }

//   onSelect = (val, index) => {
//     this.setState({
//       valueType: val,
//       // Somehow it will give you `realIndex + 1`
//       // version <=6.6.0
//       indexType: index - 1,
//     })
//   }

//   toggleCheckbox = () => {
//     this.setState(prevState => ({ checkbox: !prevState.checkbox }))
//   }

//   clickNext = () => {
//     this.props.onNext()
//   }

//   render() {
//     const { valueType, indexType, optionsType, checkbox } = this.state

//     return (
//       <>
//         <Heading text="Data Usaha" size="3" style={styles.heading} />

//         <Input
//           style={{ ...styles.input, marginTop: 20 }}
//           label="Nama Usaha"
//           placeholder="Nama usaha anda ..."
//         />

//         <InputSelect
//           onSelect={this.onSelect}
//           style={styles.input}
//           value={valueType}
//           label="Jenis Usaha"
//           placeholder="Pilih jenis usaha anda"
//           options={optionsType}
//         />

//         <Checkbox
//           style={styles.terms}
//           onPress={this.toggleCheckbox}
//           checked={checkbox}
//           clickableChildren={false}>
//           <Content>
//             Saya telah membaca dan setuju dengan{"\n"}
//             <Text
//               style={styles.termsLink}
//               onPress={() => {
//                 Linking.openURL("http://www.example.com/")
//               }}>
//               Syarat dan Ketentuan
//             </Text>{" "}
//             yang berlaku
//           </Content>
//         </Checkbox>

//         <Button
//           style={styles.button}
//           text="Selanjutnya"
//           type="primary"
//           size="large"
//           onPress={this.clickNext}
//         />
//       </>
//     )
//   }
// }

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
  },
  heading: {
    textAlign: "center",
    fontSize: FontSizes.normal,
    marginTop: 40,
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  terms: {
    marginTop: 20,
  },
  photo: {
    marginTop: 26,
  },
  termsLink: {
    color: Colors.brandPrimary,
  },
  infobox: {
    marginTop: 10,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  infoboxText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
})

export default Second
