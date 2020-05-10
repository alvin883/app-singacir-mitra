import React, { useState, useRef } from "react"
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MapViewAnimated,
} from "react-native-maps"
import { Icon, IconName } from "_c_a_icons"
import { Colors, Spaces } from "_styles"
import { View, StyleSheet, Dimensions } from "react-native"
import { Button } from "_atoms"

const screen = Dimensions.get("window")

// Change this to configure zoom level (sort of)
const LATITUDE_DELTA = 0.009

const ASPECT_RATIO = screen.width / screen.height
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const PinMap = ({ navigation, route }) => {
  const mapRef = useRef()
  const defaultMarkerCoor = {
    latitude: 39.7392,
    longitude: -104.9903,
  }

  // Check parameter passed from navigation params
  const markerIcon = route.params?.markerIcon
  const customMarkerCoor = route.params?.markerCoor
  const customOnSubmit = route.params?.onSubmit

  const initCoor = customMarkerCoor ? customMarkerCoor : defaultMarkerCoor
  const [markerCoor, setMarkerCoor] = useState(initCoor)

  /**
   * Function to handle onSubmit event, with coordinate parameter
   * @type {Function}
   */
  const onSubmit = customOnSubmit ? customOnSubmit : coor => {}

  const onSelect = e => {
    setMarkerCoor(e.nativeEvent.coordinate)
    mapRef.current.animateToRegion(
      {
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        ...e.nativeEvent.coordinate,
      },
      300,
    )
  }

  return (
    <View style={styles.wrapper}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: markerCoor.latitude,
          longitude: markerCoor.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        moveOnMarkerPress={true}
        onPoiClick={onSelect}
        onPress={onSelect}>
        {markerCoor ? (
          <Marker coordinate={markerCoor} style={styles.marker}>
            {markerIcon && (
              <View>
                <Icon
                  name={markerIcon}
                  color={Colors.brandPrimary}
                  style={styles.markerIcon}
                />
              </View>
            )}
          </Marker>
        ) : null}
      </MapView>

      {markerCoor ? (
        <View style={styles.submit}>
          <Button
            size="large"
            text="Submit"
            onPress={() => onSubmit(markerCoor)}
          />
        </View>
      ) : null}
    </View>
  )
}

const markerSize = 36
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    height: markerSize,
    width: markerSize,
  },
  markerIcon: {
    height: markerSize,
    width: markerSize,
  },
  submit: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spaces.container,
    backgroundColor: Colors.themeLight,
  },
})

export default PinMap
