import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { Spaces } from "_styles"
import { Input, Button } from "_atoms"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, unixToDate, dateToUnix } from "_utils"

const FormMenuDiscountData = ({ onValidSubmit, data: defaultVal }) => {
  const refPrice = useRef()
  const refDescription = useRef()

  const [openDateStart, setOpenDateStart] = useState(false)
  const [openDateEnd, setOpenDateEnd] = useState(false)

  const [promoStart, setPromoStart] = useState(defaultVal?.promo_start)
  const [promoEnd, setPromoEnd] = useState(defaultVal?.promo_end)

  const onSubmit = () => {
    const promo_price = parseInt(refPrice.current.state.text)
    const promo_description = refDescription.current.state.text

    const data = {
      promo_price,
      promo_start: promoStart,
      promo_end: promoEnd,
      promo_description,
    }

    // TODO: validation

    console.log({
      promoStart,
      promoEnd,
    })
    // onValidSubmit(data)
  }

  return (
    <View>
      <Input
        ref={refPrice}
        style={FormMenuDiscountDataStyles.input}
        label="Harga Promo"
        keyboardType="number-pad"
        placeholder="Harga promo untuk menu ..."
        defaultValue={defaultVal.promo_price?.toString()}
      />

      <TouchableOpacity
        onPress={() => setOpenDateStart(true)}
        activeOpacity={1}>
        <Input
          style={FormMenuDiscountDataStyles.input}
          label="Tanggal Mulai"
          placeholder="Tanggal mulai berlakunya promo ..."
          editable={false}
          value={promoStart ? formatDate(promoStart) : null}
        />
      </TouchableOpacity>

      {openDateStart && (
        <DateTimePicker
          mode="date"
          value={promoStart ? unixToDate(promoStart) : new Date()}
          onChange={(e, selected) => {
            setOpenDateStart(false)

            if (!selected) return false

            setPromoStart(dateToUnix(selected))
          }}
        />
      )}

      <TouchableOpacity onPress={() => setOpenDateEnd(true)} activeOpacity={1}>
        <Input
          style={FormMenuDiscountDataStyles.input}
          label="Tanggal Berakhir"
          placeholder="Tanggal berakhirnya promo ..."
          editable={false}
          value={promoEnd ? formatDate(promoEnd) : null}
        />
      </TouchableOpacity>

      {openDateEnd && (
        <DateTimePicker
          mode="date"
          value={promoEnd ? unixToDate(promoEnd) : new Date()}
          onChange={(e, selected) => {
            setOpenDateEnd(false)

            if (!selected) return false

            setPromoEnd(dateToUnix(selected))
          }}
        />
      )}

      {/* <Input
        style={FormMenuDiscountDataStyles.input}
        label="Tanggal Berakhir"
        placeholder="Tanggal berakhirnya promo ..."
      /> */}

      <Input
        ref={refDescription}
        style={FormMenuDiscountDataStyles.input}
        label="Deskripsi (opsional)"
        placeholder="Deskripsi tentang promo ini ..."
        defaultValue={defaultVal.promo_description}
      />

      <Button
        style={FormMenuDiscountDataStyles.submit}
        text="Simpan"
        size="large"
        onPress={onSubmit}
      />
    </View>
  )
}

// FormMenuDiscountData.propTypes = {
//   onValidSubmit: PropTypes.func.isRequired,
//   data: PropTypes.shape({
//     discount_price:
//   })
// }

const FormMenuDiscountDataStyles = StyleSheet.create({
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

const EditMenuDiscount = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormMenuDiscountData
          onValidSubmit={route.params.onValidSubmit}
          data={route.params.data}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: Spaces.container,
  },
})

export default EditMenuDiscount
