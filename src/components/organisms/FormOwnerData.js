import React, { Component, useState, useRef } from "react"
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
import { FontSizes, Spaces } from "_styles"
import { permission, customPropTypes } from "_utils"
import { IconName } from "_c_a_icons"
import { cardIdentity } from "_types"

const FormOwnerData = ({ isFirstSetup, onValidSubmit, data: defaultVal }) => {
  const refName = useRef()
  const refPhoneNumber = useRef()
  const refEmail = useRef()
  const refIdentityNumber = useRef()

  const [identityType, setIdentityType] = useState(defaultVal.identityType)
  const [identityPhoto, setIdentityPhoto] = useState(defaultVal.identityPhoto)
  const [isLoading, setLoading] = useState(false)

  const cardIdentityOptions = Object.values(cardIdentity)

  const onSelectIdentityType = (val, index) => {
    setIdentityType(cardIdentityOptions[index - 1])
  }

  const onSelectPhoto = image => {
    setIdentityPhoto(image)
  }

  const onSubmit = () => {
    const name = refName.current.state.text
    const phoneNumber = refPhoneNumber.current.state.text
    const email = refEmail.current.state.text
    const identityNumber = isFirstSetup
      ? refIdentityNumber.current.state.text
      : null

    const data = isFirstSetup
      ? {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          identityType: identityType,
          identityNumber: identityNumber,
          identityPhoto: identityPhoto,
        }
      : {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
        }

    setLoading(true)

    // TODO: Validation

    onValidSubmit(data)
  }

  return (
    <>
      {isFirstSetup && (
        <Heading text="Data Pribadi" size="3" style={styles.heading} />
      )}

      <Input
        ref={refName}
        defaultValue={defaultVal.name}
        style={{ ...styles.input, marginTop: 20 }}
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap anda ..."
      />

      <Input
        ref={refPhoneNumber}
        defaultValue={defaultVal.phoneNumber}
        style={styles.input}
        label="Nomer Telepon"
        placeholder="Nomer telepon pemilik ..."
        keyboardType="phone-pad"
      />

      <Input
        ref={refEmail}
        defaultValue={defaultVal.email}
        style={styles.input}
        label="Email"
        placeholder="Email pemilik ..."
        keyboardType="email-address"
      />

      {isFirstSetup && (
        <>
          <InputSelect
            style={styles.selectWrapper}
            label="Jenis Identitas"
            placeholder="Jenis identitas yang akan di upload ..."
            options={cardIdentityOptions}
            onSelect={onSelectIdentityType}
            value={identityType.value}
          />

          <Input
            ref={refIdentityNumber}
            defaultValue={defaultVal.identityNumber}
            style={styles.input}
            label="Nomer Identitas Pemilik"
            placeholder="Nomor identitas pemilik ..."
          />

          <InputPhoto
            style={styles.input}
            labelText={`Upload ${identityType.label}`}
            buttonText="Pilih Foto"
            buttonTextActive="Ganti Foto"
            source={identityPhoto}
            onSelectPhoto={onSelectPhoto}
          />

          <Infobox iconName={IconName.information} style={styles.infobox}>
            - Pastikan KTP didalam frame{"\n"}- Pastikan KTP masih berlaku{"\n"}
            - Maksimal 3MB
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
    identityPhoto: customPropTypes.imageSource,
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
  infobox: {
    marginTop: 20,
  },
  button: {
    marginTop: 40,
  },
  selectWrapper: {
    marginTop: 26,
  },
})

export default FormOwnerData
