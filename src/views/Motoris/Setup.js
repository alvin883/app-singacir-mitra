import React, { useRef, useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Input, InputPhoto, Button } from "_atoms"
import { Spaces } from "_styles"
import { navigationServices } from "_utils"

const Setup = () => {
  const refName = useRef()
  const refSTNK = useRef()
  const refVehicleNumber = useRef()

  const [STNKPict, setSTNKPict] = useState()
  const [driverPict, setDriverPict] = useState()

  const [isLoading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
    navigationServices.Navigate("motoris/setup/success")
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

        <Input
          ref={refSTNK}
          label="Nomor STNK"
          placeholder="Masukkan nomor STNK kendaraan anda ..."
          style={styles.input}
        />

        <InputPhoto
          style={styles.input}
          labelText="Upload Foto STNK :"
          source={STNKPict}
          onSelectPhoto={image => setSTNKPict(image)}
        />

        <InputPhoto
          style={styles.input}
          labelText="Upload Foto Wajah :"
          source={driverPict}
          onSelectPhoto={image => setDriverPict(image)}
        />

        <Button
          style={styles.submit}
          text="Selanjutnya"
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

export default Setup
