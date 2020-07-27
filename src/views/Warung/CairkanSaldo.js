import React, { useRef, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { View, ScrollView, StyleSheet, Alert } from "react-native"
import { Text, Divider, Input, Infobox, Button } from "_atoms"
import { Spaces } from "_styles"
import { PairTitleValue } from "_molecules"
import { convertToCurrency, navigationServices, asyncHandle } from "_utils"
import { IconName } from "_c_a_icons"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"
import { LoadingView, FormPaymentData } from "_organisms"
import TextData from "./TextData"

const Item = ({ title, value }) => (
  <PairTitleValue
    style={ItemStyles.table}
    titleStyle={ItemStyles.tableTitle}
    valueStyle={ItemStyles.tableValue}
    title={title}
    value={value}
    stylePreset="table"
  />
)

const ItemStyles = StyleSheet.create({
  table: {
    marginTop: 8,
  },
  tableTitle: {
    flex: 0.5,
  },
  tableValue: {
    flex: 0.5,
  },
})

const CairkanSaldo = () => {
  const refTotal = useRef()
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [hasSetup, setHasSetup] = useState(false)
  const [state, setState] = useState()
  const mitraId = useSelector(state => state.authReducer.mitraId)

  const onSubmit = async () => {
    const total = parseInt(refTotal.current.state.text)
    setLoading(true)

    let apiParams, apiData, apiPromise, apiRes, apiErr
    apiParams = { params: { mitraId: mitraId } }
    apiData = { bankId: state.bank.id, withdraw: total }
    apiPromise = axios.post("mitrawithdraw/mitraRequest", apiData, apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "withdrawErr", "withdraw-1")

    setLoading(false)
    Alert.alert(
      "Sukses",
      "Permintaan anda sudah terkirim, selanjutnya menunggu persetujuan Si-Ngacir!",
      [
        {
          text: "Oke",
          onPress: () => navigationServices.GoBack(),
        },
      ],
    )

    console.log("total: ", total)
    setLoading(true)
    navigationServices.Navigate("warung/dashboard/otp-withdraw")
  }

  const onSetupSubmit = async data => {
    setLoading(true)

    // Add Mitra Bank
    let apiData = {
      accountName: data.name,
      accountNumber: data.account,
      bankNameId: data.bank,
      phoneNumber: data.phoneNumber,
    }
    let apiParams = { params: { mitraId: mitraId } }
    let apiPromise = axios.post("mitrabank/add", apiData, apiParams)
    let [apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "bankErr", "bank-1")
    setHasSetup(true)
  }

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
    callback,
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)

    setLoading(false)
    setFetching(false)
    if (callback) callback()

    if (err?.response?.data?.message) {
      return Alert.alert("Gagal", err.response.data.message)
    }

    Alert.alert(
      `Gagal`,
      `${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`,
    )
    return false
  }

  const fetchMitraBank = async () => {
    let apiParams, apiData, apiPromise, apiRes, apiErr
    setFetching(true)

    // Get Bank List
    apiPromise = axios.get("bankname/showAll")
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) {
      return errorHandler(apiErr, "fetchBankErr", "fetch-1", null, () =>
        navigationServices.GoBack(),
      )
    }

    const bankData = apiRes.data.data

    // Mitra Balance
    apiParams = { params: { mitraId: mitraId } }
    apiPromise = axios.get("mitrabalance/showMitraBalance", apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) {
      return errorHandler(apiErr, "fetchMitraBalance", "fetch-2", null, () =>
        navigationServices.GoBack(),
      )
    }

    const balance = apiRes.data.data

    // Mitra Bank
    apiParams = { params: { mitraId: mitraId } }
    apiPromise = axios.get("mitrabank/showMitraBank", apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) {
      return errorHandler(apiErr, "fetchMitraBankErr", "fetch-3", null, () =>
        navigationServices.GoBack(),
      )
    }
    if (apiRes.data.data.length < 1) {
      setFetching(false)
      setHasSetup(false)
      return false
    }

    const mitraBank = apiRes.data.data[0]
    const bankName = bankData.find(v => v.id == mitraBank.bankNameId)

    const dataMapping = {
      bank: bankName,
      accountName: mitraBank.accountName,
      accountNumber: mitraBank.accountNumber,
      balance: balance.balance,
    }

    setState(dataMapping)
    setHasSetup(true)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchMitraBank()
    }, []),
  )

  if (isFetching) return <LoadingView />
  if (!hasSetup)
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <FormPaymentData
            text={TextData.FormPaymentDataText}
            isLoading={isLoading}
            onValidSubmit={onSetupSubmit}
          />
        </View>
      </ScrollView>
    )

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Item title="Bank" value={state.bank.name} />
        <Item title="Nama Rekening" value={state.accountName} />
        <Item title="Nomor Rekening" value={state.accountNumber} />
        <Item
          title="Saldo kantong Semar"
          value={`Rp ${convertToCurrency(parseInt(state.balance), 0, false)}`}
        />

        <Divider style={styles.divider} />

        <Input
          ref={refTotal}
          label="Nominal"
          placeholder="Masukkan nominal yang akan dicairkan ..."
          keyboardType="numeric"
        />
        <Infobox style={styles.infobox} iconName={IconName.information}>
          Minimum saldo di kantong semar Rp 10.000 Kode OTP akan dikirimkan ke
          nomor HP pencairan saldo yang terdaftar
        </Infobox>

        <Button
          style={styles.submit}
          text="Cairkan"
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
    paddingHorizontal: Spaces.container,
    paddingVertical: 40,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
  infobox: {
    marginTop: 20,
  },
  submit: {
    marginTop: 40,
  },
})

export default CairkanSaldo
