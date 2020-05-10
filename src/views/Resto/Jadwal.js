import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { FormWorkHour } from "_organisms"
import { Spaces } from "_styles"

const Jadwal = () => {
  const onSubmit = data => {
    console.log("Jadwal - FormWorkHour: ", data)
    // TODO: API call
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormWorkHour
          isFirstSetup={false}
          editRouteName="resto/dashboard/edit-jadwal"
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default Jadwal
