import React, { useRef, useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Input, InputPhoto, Button } from "_atoms"
import { Spaces } from "_styles"
import { navigationServices } from "_utils"

const Profile = () => {
  const refName = useRef()
  const refSTNK = useRef()
  const refVehicleNumber = useRef()

  const [STNKPict, setSTNKPict] = useState()
  const [driverPict, setDriverPict] = useState()

  const [isLoading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
    navigationServices.GoBack()
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Input ref={refName} label="Nama" placeholder="Nama lengkap anda ..." />

        <Input
          ref={refVehicleNumber}
          label="Nomor Plat Motor"
          placeholder="Masukkan plat motor anda ..."
          style={styles.input}
        />

        <InputPhoto
          style={styles.input}
          labelText="Upload Foto Wajah :"
          source={driverPict}
          onSelectPhoto={image => setDriverPict(image)}
        />

        <Button
          style={styles.submit}
          text="Simpan"
          size="large"
          state={isLoading ? "loading" : "default"}
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
  },
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

export default Profile
