import React from "react"
import PropTypes from "prop-types"
import { FormAddressData } from "_organisms"
import { StyleSheet, View, ScrollView } from "react-native"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"

const AlamatSingle = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormAddressData
          data={route.params.FormAddressData.data}
          isFirstSetup={false}
          pinMapRouteName="resto/dashboard/set-pin-map"
          onValidSubmit={route.params.FormAddressData.onValidSubmit}
          iconMarker={IconName.mapMarkerResto}
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

export default AlamatSingle
