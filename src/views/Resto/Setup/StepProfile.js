import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, Input, InputPhoto, Button, Infobox } from "_atoms"
import { customPropTypes, validation, objectMap, hexToRgb } from "_utils"
import { Colors, FontSizes } from "_styles"
import { useEffect } from "react"

const StepProfile = ({ onValidSubmit, data: defaultVal, isFirstSetup }) => {
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: defaultVal.name,
    description: defaultVal.description,
    email: defaultVal.email,
    category: defaultVal.category,
    phoneNumber: defaultVal.phoneNumber,
    coverPhoto: defaultVal.coverPhoto,
  })
  const [errorState, setErrorState] = useState(objectMap(state, () => null))

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkEmail = str => {
    return validation.validate("email", str)
  }

  const onSubmit = () => {
    const data = state
    const errorName = checkExistField(state.name)
    const errorDescription = checkExistField(state.description)
    const errorEmail = checkEmail(state.email)
    const errorCategory = checkExistField(state.category)
    const errorPhoneNumber = checkExistField(state.phoneNumber)
    // prettier-ignore
    const isNotValid = errorName || errorDescription || errorEmail || errorCategory

    console.log("StepProfile-default", defaultVal)
    console.log("StepProfile-data", data)

    if (isNotValid) {
      setErrorState({
        ...errorState,
        name: errorName,
        description: errorDescription,
        email: errorEmail,
        category: errorCategory,
        phoneNumber: errorPhoneNumber,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
  }

  // When defaultVal changed (ex: async data restored), update state
  useEffect(() => {
    setState(defaultVal)
  }, [defaultVal])

  return (
    <View style={styles.wrapper}>
      {isFirstSetup && (
        <Heading style={styles.heading} text="Profil Restoran" />
      )}

      <Input
        label="Nama Resto"
        placeholder="Masukkan nama resto anda ..."
        status={errorState.name ? "normal" : "warning"}
        warning={errorState.name}
        value={state.name}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            name: warning,
          })
          setState({
            ...state,
            name: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label="Deskripsi"
        placeholder="Tentang resto ..."
        status={errorState.description ? "normal" : "warning"}
        warning={errorState.description}
        value={state.description}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            description: warning,
          })
          setState({
            ...state,
            description: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label="Email"
        placeholder="Email resto ..."
        keyboardType="email-address"
        status={errorState.email ? "normal" : "warning"}
        warning={errorState.email}
        value={state.email}
        onChangeText={text => {
          const warning = checkEmail(text)
          setErrorState({
            ...errorState,
            email: warning,
          })
          setState({
            ...state,
            email: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label="Kategori Resto"
        placeholder="Kategori resto anda ..."
        status={errorState.category ? "normal" : "warning"}
        warning={errorState.category}
        value={state.category}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            category: warning,
          })
          setState({
            ...state,
            category: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label="Nomor HP"
        placeholder="Nomor hp resto ..."
        keyboardType="phone-pad"
        status={errorState.phoneNumber ? "normal" : "warning"}
        warning={errorState.phoneNumber}
        value={state.phoneNumber}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            phoneNumber: warning,
          })
          setState({
            ...state,
            phoneNumber: text,
          })
        }}
      />

      <InputPhoto
        style={{ ...styles.input, ...styles.coverPhoto }}
        labelText="Upload foto sampul"
        buttonText="Pilih Foto"
        buttonTextActive="Ganti Foto"
        source={state.coverPhoto}
        onSelectPhoto={image => {
          setState({
            ...state,
            coverPhoto: image,
          })
        }}
      />

      {/* Optional: enable this if coverPhoto is required */}
      {/* {errorState.coverPhoto && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          Anda harus menyetujui kolom ini terlebih dahulu
        </Infobox>
      )} */}

      <Button
        style={styles.submit}
        text={isFirstSetup ? "Selanjutnya" : "Simpan"}
        size="large"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </View>
  )
}

StepProfile.propTypes = {
  onValidSubmit: customPropTypes.functionWithParams(1),
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    category: PropTypes.string,
    phoneNumber: PropTypes.string,
    coverPhoto: customPropTypes.imageSource,
  }),
  isFirstSetup: PropTypes.bool,
}

StepProfile.defaultProps = {
  onValidSubmit: data => {},
  data: {
    name: null,
    description: null,
    email: null,
    category: null,
    phoneNumber: null,
    coverPhoto: null,
  },
  isFirstSetup: true,
}

const styles = StyleSheet.create({
  wrapper: {},
  heading: {
    textAlign: "center",
  },
  input: {
    marginTop: 26,
  },
  coverPhoto: {},
  infobox: {
    marginTop: 10,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  infoboxText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
  submit: {
    marginTop: 40,
  },
})

export default StepProfile
