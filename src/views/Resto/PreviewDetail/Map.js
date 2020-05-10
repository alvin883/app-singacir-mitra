import React, { Component } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontSizes, FontFamily, Spaces } from "_styles"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { Icon } from "_c_a_icons"

const screen = Dimensions.get("window")

// Change this to configure zoom level (sort of)
const LATITUDE_DELTA = 0.005

const ASPECT_RATIO = screen.width / screen.height
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Map = ({ longitude, latitude, markerIconName, isStatic }) => {
  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
        onRegionChange={() => {}}
        region={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA,
        }}
        scrollEnabled={!isStatic}
        zoomEnabled={!isStatic}>
        <Marker
          coordinate={{
            longitude: longitude,
            latitude: latitude,
          }}
          style={styles.mapMarker}>
          <View>
            <Icon
              name={markerIconName}
              color={Colors.brandPrimary}
              style={styles.mapMarkerIcon}
            />
          </View>
        </Marker>
      </MapView>

      {/* <Text style={styles.text}>MAPS</Text> */}
    </View>
  )
}

const viewport = Dimensions.get("window")
const markerSize = 36
const styles = StyleSheet.create({
  wrapper: {
    width: viewport.width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.themeImgPlaceholder,
  },
  text: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.bold,
    opacity: 0.3,
  },
  mapWrapper: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapWrapperActive: {
    marginTop: 26,
  },
  mapView: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  mapButtonActive: {
    marginTop: 10,
    alignSelf: "center",
  },
  mapMarker: {
    height: markerSize,
    width: markerSize,
  },
  mapMarkerIcon: {
    height: markerSize,
    width: markerSize,
  },
})

export default Map
