import React, { useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, Input, InputPhoto, Button } from "_atoms"
import { customPropTypes } from "_utils"

const StepProfile = ({ onValidSubmit, data: defaultVal, isFirstSetup }) => {
  const [coverPhoto, setCoverPhoto] = useState(defaultVal.coverPhoto)
  const [isLoading, setLoading] = useState(false)

  // All references
  const refName = useRef()
  const refDescription = useRef()
  const refEmail = useRef()
  const refCategory = useRef()
  const refPhoneNumber = useRef()

  const onSelectPhoto = image => {
    setCoverPhoto(image)
  }

  const onSubmit = () => {
    const name = refName.current.state.text
    const description = refDescription.current.state.text
    const email = refEmail.current.state.text
    const category = refCategory.current.state.text
    const phoneNumber = refPhoneNumber.current.state.text
    const data = {
      name,
      description,
      email,
      category,
      phoneNumber,
      coverPhoto,
    }

    setLoading(true)

    // TODO: validation code

    // TODO: API call to save the data

    onValidSubmit(data)
  }

  return (
    <View style={styles.wrapper}>
      {isFirstSetup && (
        <Heading style={styles.heading} text="Profil Restoran" />
      )}

      <Input
        ref={refName}
        defaultValue={defaultVal.name}
        label="Nama Resto"
        placeholder="Masukkan nama resto anda ..."
      />

      <Input
        ref={refDescription}
        defaultValue={defaultVal.description}
        style={styles.input}
        label="Deskripsi"
        placeholder="Tentang resto ..."
      />

      <Input
        ref={refEmail}
        defaultValue={defaultVal.email}
        style={styles.input}
        label="Email"
        placeholder="Email resto ..."
        keyboardType="email-address"
      />

      <Input
        ref={refCategory}
        defaultValue={defaultVal.category}
        style={styles.input}
        label="Kategori Resto"
        placeholder="Kategori resto anda ..."
      />

      <Input
        ref={refPhoneNumber}
        defaultValue={defaultVal.phoneNumber}
        style={styles.input}
        label="Nomor HP"
        placeholder="Nomor hp resto ..."
        keyboardType="phone-pad"
      />

      <InputPhoto
        style={{ ...styles.input, ...styles.coverPhoto }}
        labelText="Upload foto sampul"
        buttonText="Pilih Foto"
        buttonTextActive="Ganti Foto"
        source={coverPhoto}
        onSelectPhoto={onSelectPhoto}
      />

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
  submit: {
    marginTop: 40,
  },
})

export default StepProfile
