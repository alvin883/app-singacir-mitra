import React, { useState, useRef, useEffect, useCallback } from "react"
import { View, StyleSheet, BackHandler } from "react-native"
import PropTypes from "prop-types"
import {
  Input,
  InputSelect,
  Heading,
  InputPhoto,
  Button,
  Infobox,
} from "_atoms"
import {
  customPropTypes,
  navigationServices,
  asyncHandle,
  validation,
  objectMap,
  hexToRgb,
} from "_utils"
import axios from "axios"
import { LoadingView } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"
import { Colors, FontSizes } from "_styles"

const DEFAULT_TEXT = {
  pencairanPlaceholder: "Nomor HP untuk pencairan saldo resto ...",
}

const FormPaymentData = ({
  onValidSubmit,
  onBackData,
  data: defaultVal,
  isLoading: propIsLoading,
  text = DEFAULT_TEXT,
}) => {
  const initBank = defaultVal.bank ? defaultVal.bank : null
  const initSavingBook = defaultVal.savingBook ? defaultVal.savingBook : null
  const [state, setState] = useState({
    bank: initBank,
    name: defaultVal.name,
    account: defaultVal.account,
    phoneNumber: defaultVal.phoneNumber,
    savingBook: initSavingBook,
  })
  const [errorState, setErrorState] = useState(objectMap(state, () => null))
  const [banks, setBanks] = useState({ isFetching: true, listBank: [] })
  const [isLoading, setLoading] = useState(propIsLoading || false)

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkFilled = value => {
    if (!value) return "Kolom ini tidak boleh kosong"
    return null
  }

  const onSubmit = () => {
    const data = state
    const errorBank = checkFilled(state.bank)
    const errorName = checkExistField(state.name)
    const errorAccount = checkExistField(state.account)
    const errorPhoneNumber = checkExistField(state.phoneNumber)
    const errorSavingBook = checkFilled(state.savingBook)
    // prettier-ignore
    const isNotValid = errorBank || errorName || errorAccount || errorPhoneNumber || errorSavingBook

    if (isNotValid) {
      setErrorState({
        ...errorState,
        bank: errorBank,
        name: errorName,
        account: errorAccount,
        phoneNumber: errorPhoneNumber,
        savingBook: errorSavingBook,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
  }

  const fetchBankList = async () => {
    const bankPromise = axios.get("bankname/showAll")
    const [bankRes, bankErr] = await asyncHandle(bankPromise)
    if (bankErr) return alert("Ada kesalahan mengambil data bank")

    const bankData = bankRes.data.data
    const listBank = bankData.map(item => ({
      label: item.name,
      value: item.id.toString(),
    }))
    console.log("listBank", listBank)
    setBanks({ isFetching: false, listBank })
    setState({
      ...state,
      bank: listBank[0].value,
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchBankList()
    }, []),
  )

  useEffect(() => {
    setLoading(propIsLoading)
  }, [propIsLoading])

  if (banks.isFetching) return <LoadingView />

  return (
    <View style={styles.wrapper}>
      <Heading style={styles.heading} text="Data Pembayaran" />

      <InputSelect
        style={styles.input}
        label="Bank"
        placeholder="Pilih bank anda ..."
        options={banks.listBank}
        value={state.bank}
        onSelect={val => {
          console.log("onSelect: ", val)
          setState({
            ...state,
            bank: val,
          })
        }}
      />

      {errorState.bank && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          {errorState.bank}
        </Infobox>
      )}

      <Input
        style={styles.input}
        label="Nama Pemilik"
        placeholder="Nama anda ..."
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
        label="Nomor Rekening"
        placeholder="Nomor rekening anda ..."
        keyboardType="decimal-pad"
        status={errorState.account ? "normal" : "warning"}
        warning={errorState.account}
        value={state.account}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            account: warning,
          })
          setState({
            ...state,
            account: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label="Nomor HP Pencairan Saldo"
        placeholder={
          text.pencairanPlaceholder || DEFAULT_TEXT.pencairanPlaceholder
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
        style={styles.input}
        labelText="Upload buku rekening"
        source={state.savingBook}
        onSelectPhoto={image => {
          setErrorState({
            ...errorState,
            savingBook: null,
          })
          setState({
            ...state,
            savingBook: image,
          })
        }}
      />

      {errorState.savingBook && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          {errorState.savingBook}
        </Infobox>
      )}

      <Button
        style={styles.submit}
        size="large"
        text="Selanjutnya"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </View>
  )
}

FormPaymentData.propTypes = {
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

FormPaymentData.defaultProps = {
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

export default FormPaymentData
