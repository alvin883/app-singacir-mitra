import React, { useEffect, useState } from "react"
import { StepProfile } from "./Setup"
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices } from "_utils"

const Profile = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  const onSubmit = data => {
    setData(data)
    console.log("onSubmit, data: ", data)

    // TODO: API call
    setTimeout(() => {
      navigationServices.GoBack()
    }, 1000)
  }

  useEffect(() => {
    let isMounted = true

    // TODO: API call
    setTimeout(() => {
      console.log("useEffect, isMounted: ", isMounted)

      if (isMounted) {
        // Example
        setData(sample.RestoProfile)
        setLoading(false)
      }
    }, 775)

    // To prevent update in unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  return isLoading ? (
    <View style={styles.wrapperLoading}>
      <ActivityIndicator color={Colors.brandPrimary} size="large" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.wrapper}>
        <StepProfile
          data={data}
          isFirstSetup={false}
          onValidSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapperLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
})

export default Profile
