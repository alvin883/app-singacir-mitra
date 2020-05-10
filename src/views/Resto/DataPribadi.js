import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Text } from "_atoms"
import { FormOwnerData } from "_organisms"
import { Spaces, Colors } from "_styles"
import { cardIdentity } from "_types"
import { navigationServices } from "_utils"

const DataPribadi = () => {
  const [isFetching, setFetching] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    let isMounted = true

    // TODO: API call
    setTimeout(() => {
      // Example
      console.log("DataPribadi useEffect, isMounted: ", isMounted)

      if (isMounted) {
        setData({
          name: "Alvin Novian",
          phoneNumber: "08138091823",
          email: "alvinnovian883@gmail.com",
          identityType: cardIdentity.KTP,
          identityNumber: "1723678123716238",
          identityPhoto: null,
        })
        setFetching(false)
      }
    }, 775)

    // To prevent update in unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  const onSubmit = data => {
    console.log("DataPribadi - onSubmit", data)
    navigationServices.GoBack()
  }

  return isFetching ? (
    <View style={styles.wrapperFetching}>
      <ActivityIndicator color={Colors.brandPrimary} size="large" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.wrapper}>
        <FormOwnerData
          isFirstSetup={false}
          data={data}
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapperFetching: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default DataPribadi
