import React, { Component, useState, useEffect, useCallback } from "react"
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native"
import PropTypes from "prop-types"
import { Illustrations, Button, Input, InputPhoto } from "_atoms"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import { sample, navigationServices } from "_utils"
import { BlockList } from "_organisms"
import IllustrationMakcomblang from "_assets/images/illustration-makcomblang.png"
import { useFocusEffect } from "@react-navigation/native"

const Register = () => {
  const [coverPict, setCoverPict] = useState()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandMakcomblang)
      StatusBar.setBarStyle("light-content")
    }, []),
  )

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Input label="Nama" placeholder="Nama lengkap ..." />

        <Input
          style={styles.input}
          label="Alamat"
          placeholder="Alamat anda ..."
        />

        <Input
          style={styles.input}
          label="Nomor HP"
          placeholder="Nomor HP anda ..."
        />

        <Input
          style={styles.input}
          label="Email"
          placeholder="Email anda ..."
        />

        <Input
          style={styles.input}
          label="Deskripsi"
          placeholder="Deskripsi komunitas ..."
        />

        <InputPhoto
          style={styles.input}
          labelText="Upload Foto:"
          source={coverPict}
          onSelectPhoto={image => setCoverPict(image)}
        />

        <Button style={styles.submit} text="Daftar" size="large" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 40,
    paddingHorizontal: Spaces.container,
  },
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

export default Register
