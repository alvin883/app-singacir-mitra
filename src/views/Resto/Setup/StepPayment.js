import React, { useState, useRef, useEffect } from "react"
import { View, StyleSheet, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Input, InputSelect, Heading, InputPhoto, Button } from "_atoms"
import { customPropTypes, navigationServices } from "_utils"

const BANK_VALUE = {
  BCA: "bca",
  BNI: "bni",
  BRI: "bri",
  BTPN: "btpn",
}
const LIST_BANK = [
  { label: "BCA", value: BANK_VALUE.BCA },
  { label: "BNI", value: BANK_VALUE.BNI },
  { label: "BRI", value: BANK_VALUE.BRI },
  { label: "BTPN", value: BANK_VALUE.BTPN },
]

const StepPayment = ({ onValidSubmit, onBackData, data: defaultVal }) => {
  const refName = useRef()
  const refAccount = useRef()
  const refPhoneNumber = useRef()

  const initBank = defaultVal.bank ? defaultVal.bank : null
  const initSavingBook = defaultVal.savingBook ? defaultVal.savingBook : null
  const [bank, setBank] = useState(initBank)
  const [savingBook, setSavingBook] = useState(initSavingBook)
  const [isLoading, setLoading] = useState(false)

  const onSelectSavingBook = image => {
    setSavingBook(image)
  }

  const onSubmit = () => {
    const name = refName.current.state.text
    const account = refAccount.current.state.text
    const phoneNumber = refPhoneNumber.current.state.text

    const data = {
      bank,
      name,
      account,
      phoneNumber,
      savingBook,
    }

    setLoading(true)

    // TODO: data validation

    // TODO: API call to save data

    onValidSubmit(data)
  }

  return (
    <View style={styles.wrapper}>
      <Heading style={styles.heading} text="Data Pembayaran" />

      <InputSelect
        style={styles.input}
        label="Bank"
        placeholder="Pilih bank anda ..."
        options={LIST_BANK}
        value={bank}
        onSelect={val => {
          console.log("onSelect: ", val)
          setBank(val)
        }}
      />

      <Input
        ref={refName}
        defaultValue={defaultVal.name}
        style={styles.input}
        label="Nama Pemilik"
        placeholder="Nama anda ..."
      />

      <Input
        ref={refAccount}
        defaultValue={defaultVal.account}
        style={styles.input}
        label="Nomor Rekening"
        placeholder="Nomor rekening anda ..."
        keyboardType="decimal-pad"
      />

      <Input
        ref={refPhoneNumber}
        defaultValue={defaultVal.phoneNumber}
        style={styles.input}
        label="Nomor HP Pencairan Saldo"
        placeholder="Nomor HP untuk pencairan saldo resto ..."
        keyboardType="phone-pad"
      />

      <InputPhoto
        style={styles.input}
        labelText="Upload buku rekening"
        source={savingBook}
        onSelectPhoto={onSelectSavingBook}
      />

      <Button
        style={styles.submit}
        size="large"
        text="Submit"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </View>
  )
}

StepPayment.propTypes = {
  onValidSubmit: PropTypes.func.isRequired,
  onBackData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    account: PropTypes.string,
    phoneNumber: PropTypes.string,

    // Bank code value, see BANK_VALUE for available options
    bank: PropTypes.string,
    savingBook: customPropTypes.imageSource,
  }),
}

StepPayment.defaultProps = {
  onValidSubmit: data => {},
  onBackData: data => {},
  data: {
    name: null,
    account: null,
    phoneNumber: null,
    bank: null,
    savingBook: null,
  },
}

const styles = StyleSheet.create({
  wrapper: {},
  heading: {
    textAlign: "center",
  },
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

export default StepPayment
