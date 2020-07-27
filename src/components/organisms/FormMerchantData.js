import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, Input, InputPhoto, Button, Infobox } from "_atoms"
import { customPropTypes, validation, objectMap, hexToRgb } from "_utils"
import { Colors, FontSizes } from "_styles"
import { useEffect } from "react"

const DEFAULT_TEXT = {
  heading: "Profil Resto",
  nameLabel: "Nama resto",
  namePlaceholder: "Masukkan nama resto anda",
  descriptionLabel: "Deskripsi",
  descriptionPlaceholder: "Tentang resto ...",
  emailLabel: "Email",
  emailPlaceholder: "Email resto ...",
  categoryLabel: "Kategori Resto",
  categoryPlaceholder: "Kategori resto anda ...",
  phoneNumberLabel: "Nomor HP",
  phoneNumberPlaceholder: "Nomor hp resto ...",
  coverPhotoLabel: "Upload foto sampul",
  //   coverPhotoPlaceholder: null,
}

const FormMerchantData = ({
  onValidSubmit,
  data: defaultVal,
  isFirstSetup,
  isLoading: propIsLoading,
  text = DEFAULT_TEXT,
}) => {
  const [isLoading, setLoading] = useState(propIsLoading || false)
  const [state, setState] = useState({
    name: defaultVal.name,
    description: defaultVal.description,
    email: defaultVal.email,
    category: defaultVal.category,
    phoneNumber: defaultVal.phoneNumber,
    coverPhoto: defaultVal.coverPhoto,
  })
  const [errorState, setErrorState] = useState(objectMap(state, () => null))

  const checkFilled = value => {
    if (!value) return "Kolom ini tidak boleh kosong"
    return null
  }

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
    const errorCoverPhoto = checkFilled(state.coverPhoto)
    // prettier-ignore
    const isNotValid = errorName || errorDescription || errorEmail || errorCategory || errorCoverPhoto

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
        coverPhoto: errorCoverPhoto,
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

  useEffect(() => {
    setLoading(propIsLoading)
  }, [propIsLoading])

  return (
    <View style={styles.wrapper}>
      {isFirstSetup && <Heading style={styles.heading} text={text.heading} />}

      <Input
        label={text.nameLabel || DEFAULT_TEXT.nameLabel}
        placeholder={text.namePlaceholder || DEFAULT_TEXT.namePlaceholder}
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
        label={text.descriptionLabel || DEFAULT_TEXT.descriptionLabel}
        placeholder={
          text.descriptionPlaceholder || DEFAULT_TEXT.descriptionPlaceholder
        }
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
        label={text.emailLabel || DEFAULT_TEXT.emailLabel}
        placeholder={text.emailPlaceholder || DEFAULT_TEXT.emailPlaceholder}
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
        label={text.categoryLabel || DEFAULT_TEXT.categoryLabel}
        placeholder={
          text.categoryPlaceholder || DEFAULT_TEXT.categoryPlaceholder
        }
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
        label={text.phoneNumberLabel || DEFAULT_TEXT.phoneNumberLabel}
        placeholder={
          text.phoneNumberPlaceholder || DEFAULT_TEXT.phoneNumberPlaceholder
        }
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
        labelText={text.coverPhotoLabel || DEFAULT_TEXT.coverPhotoLabel}
        buttonText="Pilih Foto"
        buttonTextActive="Ganti Foto"
        source={state.coverPhoto}
        onSelectPhoto={image => {
          setState({
            ...state,
            coverPhoto: image,
          })
          setErrorState({
            ...errorState,
            coverPhoto: null,
          })
        }}
      />

      {/* Optional: enable this if coverPhoto is required */}
      {errorState.coverPhoto && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          {errorState.coverPhoto}
        </Infobox>
      )}

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

FormMerchantData.propTypes = {
  onValidSubmit: customPropTypes.functionWithParams(1),
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    category: PropTypes.string,
    phoneNumber: PropTypes.string,
    coverPhoto: InputPhoto.propTypes.source,
  }),
  isFirstSetup: PropTypes.bool,
  text: PropTypes.shape({
    heading: PropTypes.string,
    nameLabel: PropTypes.string,
    namePlaceholder: PropTypes.string,
    descriptionLabel: PropTypes.string,
    descriptionPlaceholder: PropTypes.string,
    emailLabel: PropTypes.string,
    emailDescription: PropTypes.string,
    categoryLabel: PropTypes.string,
    categoryPlaceholder: PropTypes.string,
    phoneNumberLabel: PropTypes.string,
    phoneNumberPlaceholder: PropTypes.string,
    coverPhotoLabel: PropTypes.string,
    coverPhotoPlaceholder: PropTypes.string,
  }),
}

FormMerchantData.defaultProps = {
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
  text: { ...DEFAULT_TEXT },
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

export default FormMerchantData
