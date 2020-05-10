import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, Divider, Input, Infobox, Button } from "_atoms"
import { Spaces } from "_styles"
import { PairTitleValue } from "_molecules"
import { convertToCurrency, navigationServices } from "_utils"
import { IconName } from "_c_a_icons"

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

  const onSubmit = () => {
    const total = refTotal.current.state.text

    console.log("total: ", total)
    setLoading(true)
    navigationServices.Navigate("motoris/dashboard/otp-withdraw")
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Item title="Bank" value="BCA" />
        <Item title="Nama Rekening" value="John Doe" />
        <Item title="Nomor Rekening" value="0192 8382 3656" />
        <Item
          title="Saldo kantong Semar"
          value={`Rp ${convertToCurrency(800000)}`}
        />

        <Divider style={styles.divider} />

        <Input
          ref={refTotal}
          label="Nominal"
          placeholder="Masukkan nominal yang akan dicairkan ..."
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
