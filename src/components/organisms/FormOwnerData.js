import React, {
  Component,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react"
import PropTypes from "prop-types"
import { Dimensions, StyleSheet } from "react-native"
import ImagePicker from "react-native-image-picker"
import {
  Button,
  Heading,
  Input,
  InputPhoto,
  InputSelect,
  Infobox,
} from "_atoms"
import { FontSizes, Spaces, Colors } from "_styles"
import {
  permission,
  customPropTypes,
  objectMap,
  validation,
  hexToRgb,
  asyncHandle,
} from "_utils"
import { IconName } from "_c_a_icons"
import { cardIdentity } from "_types"
import { useFocusEffect } from "@react-navigation/native"
import Axios from "axios"
import { LoadingView } from "_organisms"

const FormOwnerData = ({
  isFirstSetup,
  onValidSubmit,
  data: defaultVal,
  isLoading: propIsLoading,
}) => {
  const [isLoading, setLoading] = useState(propIsLoading || false)
  const [isFetching, setFetching] = useState(isFirstSetup)
  const [cardOptions, setCardOptions] = useState(cardIdentity)
  const [identityLabel, setIdentityLabel] = useState(null)
  const [state, setState] = useState({
    name: defaultVal.name,
    phoneNumber: defaultVal.phoneNumber,
    email: defaultVal.email,
    identityType: defaultVal.identityType,
    identityNumber: defaultVal.identityNumber,
    identityPhoto: defaultVal.identityPhoto,
  })
  const [errorState, setErrorState] = useState(objectMap(state, val => null))

  const onSelectIdentityType = (val, index) => {
    setState({
      ...state,
      identityType: val,
    })
    setErrorState({
      ...errorState,
      identityType: null,
    })
    setIdentityLabel(cardOptions[index - 1]?.label || "")
  }

  const onSelectPhoto = image => {
    setState({
      ...state,
      identityPhoto: image,
    })
    setErrorState({
      ...errorState,
      identityPhoto: null,
    })
  }

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkEmail = str => {
    return validation.validate("email", str)
  }

  const checkFilled = value => {
    if (!value) return "Kolom ini tidak boleh kosong"
    return null
  }

  const onSubmit = () => {
    const _dataUpdate = {
      name: state.name,
      phoneNumber: state.phoneNumber,
      email: state.email,
    }
    const data = isFirstSetup ? state : _dataUpdate
    const errorName = checkExistField(state.name)
    const errorPhoneNumber = checkExistField(state.phoneNumber)
    const errorEmail = checkEmail(state.email)
    const errorIdentityType = checkFilled(state.identityType)
    const errorIdentityNumber = checkExistField(state.identityNumber)
    const errorIdentityPhoto = checkFilled(state.identityPhoto)
    // prettier-ignore
    const isNotValid = errorName || errorPhoneNumber || errorEmail || errorIdentityType || errorIdentityNumber || errorIdentityPhoto

    if (isNotValid) {
      setErrorState({
        ...errorState,
        name: errorName,
        phoneNumber: errorPhoneNumber,
        email: errorEmail,
        identityType: errorIdentityType,
        identityNumber: errorIdentityNumber,
        identityPhoto: errorIdentityPhoto,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
  }

  const fetchCardOptions = async () => {
    const request = Axios.get("cards/showAll")
    const [response, err] = await asyncHandle(request)
    if (err) return alert("Terjadi kesalahan")

    const data = response.data.data
    if (!data.length) return alert("Data cards tidak ditemukan")
    const mapping = data.map(val => ({
      label: val.name,
      value: val.id.toString(),
    }))
    setCardOptions(mapping)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      if (isFirstSetup) fetchCardOptions()
    }, []),
  )

  useEffect(() => {
    setLoading(propIsLoading)
  }, [propIsLoading])

  if (isFetching) return <LoadingView style={styles.loading} />

  return (
    <>
      {isFirstSetup && (
        <Heading text="Data Pribadi" size="3" style={styles.heading} />
      )}

      <Input
        style={{ ...styles.input, marginTop: 20 }}
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap anda ..."
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
        label="Nomer Telepon"
        placeholder="Nomer telepon pemilik ..."
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

      {isFirstSetup && (
        <Input
          style={styles.input}
          label="Email"
          placeholder="Email pemilik ..."
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
      )}

      {isFirstSetup && (
        <>
          <InputSelect
            style={styles.selectWrapper}
            label="Jenis Identitas"
            placeholder="Jenis identitas yang akan di upload ..."
            options={cardOptions}
            onSelect={onSelectIdentityType}
            value={state.identityType?.value}
          />

          {errorState.identityType && (
            <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
              {errorState.identityType}
            </Infobox>
          )}

          <Input
            style={styles.input}
            label="Nomer Identitas Pemilik"
            placeholder="Nomor identitas pemilik ..."
            status={errorState.identityNumber ? "normal" : "warning"}
            warning={errorState.identityNumber}
            value={state.identityNumber}
            onChangeText={text => {
              const warning = checkExistField(text)
              setErrorState({
                ...errorState,
                identityNumber: warning,
              })
              setState({
                ...state,
                identityNumber: text,
              })
            }}
          />

          <InputPhoto
            style={styles.input}
            labelText={`Upload ${identityLabel}`}
            buttonText="Pilih Foto"
            buttonTextActive="Ganti Foto"
            source={state.identityPhoto}
            onSelectPhoto={onSelectPhoto}
          />

          {errorState.identityPhoto && (
            <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
              {errorState.identityPhoto}
            </Infobox>
          )}

          <Infobox iconName={IconName.information} style={styles.infoboxInfo}>
            - Pastikan didalam frame{"\n"}- Pastikan masih berlaku{"\n"}-
            Maksimal 3MB
          </Infobox>
        </>
      )}

      <Button
        style={styles.button}
        text={isFirstSetup ? "Selanjutnya" : "Simpan"}
        type="primary"
        size="large"
        state={isLoading ? "loading" : "default"}
        onPress={onSubmit}
      />
    </>
  )
}

FormOwnerData.propTypes = {
  isFirstSetup: PropTypes.bool,
  onValidSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    identityType: PropTypes.any,
    identityNumber: PropTypes.string,
    identityPhoto: InputPhoto.propTypes.source,
  }),
}

FormOwnerData.defaultProps = {
  isFirstSetup: true,
  onValidSubmit: data => {},
  data: {
    name: null,
    phoneNumber: null,
    email: null,
    identityType: cardIdentity.KTP,
    identityNumber: null,
    identityPhoto: null,
  },
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
  },
  heading: {
    textAlign: "center",
    fontSize: FontSizes.normal,
    marginTop: 40,
  },
  picker: {
    height: 40,
    width: Dimensions.get("window").width - Spaces.container * 2,
  },
  input: {
    marginTop: 26,
  },
  infoboxInfo: {
    marginTop: 20,
  },
  infobox: {
    marginTop: 10,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  infoboxText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
  button: {
    marginTop: 40,
  },
  selectWrapper: {
    marginTop: 26,
  },
})

export default FormOwnerData
