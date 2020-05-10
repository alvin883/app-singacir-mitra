import React, { useState } from "react"
import PropTypes from "prop-types"
import { StyleSheet, View, ScrollView } from "react-native"
import { Spaces, Colors, FontSizes, FontFamily } from "_styles"
import { Text, Button } from "_atoms"
import RNPincode from "react-native-smooth-pincode-input"
import { hexToRgb, navigationServices } from "_utils"

const PinCode = ({ value, onTextChange }) => (
  <RNPincode
    containerStyle={PincodeStyles.containerStyle}
    cellStyle={PincodeStyles.cell}
    cellStyleFocused={PincodeStyles.cellFocus}
    cellSize={40}
    cellSpacing={14}
    codeLength={4}
    textStyle={PincodeStyles.codeText}
    value={value}
    restrictToNumbers={true}
    onTextChange={code => onTextChange(code)}
  />
)

const PincodeStyles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
  },
  cell: {
    borderBottomWidth: 1,
    borderColor: hexToRgb(Colors.themeDark, 0.25),
  },
  cellFocus: {
    borderColor: Colors.brandPrimary,
  },
  codeText: {
    fontSize: FontSizes.extraLarge,
    fontFamily: FontFamily.normal,
    color: Colors.textPrimary,
  },
})

const CairkanSaldoOTP = () => {
  const [code, setCode] = useState()
  const [isLoading, setLoading] = useState(false)

  const onCodeChange = code => setCode(code)

  const onSubmit = () => {
    setLoading(true)

    //  Example
    setTimeout(() => {
      navigationServices.Navigate("pedagang/dashboard/proses-withdraw")
    }, 1000)
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.header} weight="bold">
          Masukkan kode OTP
        </Text>
        <PinCode onTextChange={onCodeChange} value={code} />

        <Button
          style={styles.submit}
          text="Konfirmasi"
          size="large"
          state={isLoading ? "loading" : "default"}
          onPress={onSubmit}
        />
        <View style={styles.resendWrapper}>
          <Button
            styles={styles.resend}
            text="Kirim ulang kode OTP"
            type="secondary"
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 80,
    paddingHorizontal: Spaces.container,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
  },
  submit: {
    marginTop: 40,
  },
  resendWrapper: {
    marginTop: 10,
  },
})

export default CairkanSaldoOTP
