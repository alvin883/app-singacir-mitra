import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ScrollView, View, StyleSheet } from "react-native"
import { Text, Infobox, Checkbox, Button } from "_atoms"
import { IconName } from "_c_a_icons"
import { Spaces } from "_styles"
import { sample, navigationServices } from "_utils"

const DATA = sample.RestoMenu

const PesananTolak = () => {
  const [items, setItems] = useState(DATA)
  const [itemsState, setItemsState] = useState([])

  useEffect(() => {
    let initItemsState = []
    items.map(() => {
      initItemsState.push(false)
    })
    setItemsState(initItemsState)
  }, [])

  const toggleItemState = index => {
    const newItemsState = [...itemsState]

    newItemsState[index] = !newItemsState[index]
    setItemsState(newItemsState)
  }

  const onCancel = () => {
    navigationServices.GoBack()
  }

  const onSubmit = () => {
    console.log("Submit PesananTolak")
    navigationServices.Navigate("dashboard/pedagang")
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text weight="bold">Daftar Pesanan</Text>
        <Infobox iconName={IconName.information} style={styles.infobox}>
          Tandai jika ada pesanan yang habis, transaksi akan dibatalkan dan
          ketersediaan menu akan di update secara otomatis.
        </Infobox>

        <View style={styles.checkboxWrapper}>
          {items.map((val, i) => (
            <Checkbox
              key={i}
              style={styles.checkbox}
              onPress={toggleItemState.bind(null, i)}
              checked={itemsState[i]}>
              <Text>{val.menu_name}</Text>
            </Checkbox>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            style={styles.button}
            text="Batal"
            type="secondary"
            size="large"
            onPress={onCancel}
          />
          <Button
            style={styles.button}
            text="Konfirm"
            size="large"
            onPress={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 40,
    paddingHorizontal: Spaces.container,
  },
  infobox: {
    marginTop: 20,
  },
  checkboxWrapper: {
    marginVertical: 14,
  },
  checkbox: {
    paddingVertical: 8,
  },
  actions: {
    margin: -6,
    marginTop: 10,
    flexDirection: "row",
  },
  button: {
    flex: 0.5,
    margin: 6,
  },
})

export default PesananTolak
