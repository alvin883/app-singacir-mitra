import React, { useRef, useState } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types"
import { Heading, Input, Button, InputLabel } from "_atoms"
import { customPropTypes, navigationServices } from "_utils"
import { IconName, Icon } from "_c_a_icons"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { Spaces, Colors } from "_styles"

const screen = Dimensions.get("window")

// Change this to configure zoom level (sort of)
const LATITUDE_DELTA = 0.005

const ASPECT_RATIO = screen.width / screen.height
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

/**
 * TODO: Tobe deleted, switch to FormAddressData instead
 * @deprecated
 */
const StepAddress = ({ data: defaultVal, onValidSubmit }) => {
  const refAddress = useRef()
  const refKelurahan = useRef()
  const refKecamatan = useRef()
  const refPostCode = useRef()

  const _pinMapCoordinate = defaultVal.pinMap ? defaultVal.pinMap : undefined
  const [pinMapCoordinate, setPinMapCoordinate] = useState(_pinMapCoordinate)

  const [isLoading, setLoading] = useState(false)

  const onSubmit = () => {
    const address = refAddress.current.state.text
    const kelurahan = refKelurahan.current.state.text
    const kecamatan = refKecamatan.current.state.text
    const postCode = refPostCode.current.state.text
    const pinMap = pinMapCoordinate

    const data = {
      address,
      kelurahan,
      kecamatan,
      postCode,
      pinMap,
    }

    console.log("StepAddress-default", defaultVal)
    console.log("StepAddress-data", data)

    setLoading(true)

    // TODO: data validation

    // TODO: API call to save data

    onValidSubmit(data)
  }

  const handleMapClick = () => {
    navigationServices.Navigate("resto/setup/set-pin-map", {
      markerIcon: IconName.mapMarkerMotoris,
      markerCoor: pinMapCoordinate,
      onSubmit: coor => {
        console.log("StepAddress - PinMap.onSubmit: ", coor)

        setPinMapCoordinate(coor)
        navigationServices.GoBack()
      },
    })
  }

  return (
    <View style={styles.wrapper}>
      <Heading style={styles.heading} text="Alamat" />

      <Input
        ref={refAddress}
        defaultValue={defaultVal.address}
        label="Alamat"
        placeholder="Alamat lengkap resto ..."
      />

      <Input
        ref={refKelurahan}
        defaultValue={defaultVal.kelurahan}
        style={styles.input}
        label="Kelurahan"
        placeholder="Masukkan kelurahan resto ..."
      />

      <Input
        ref={refKecamatan}
        defaultValue={defaultVal.kecamatan}
        style={styles.input}
        label="Kecamatan"
        placeholder="Masukkan kecamatan resto ..."
      />

      <Input
        ref={refPostCode}
        defaultValue={defaultVal.postCode}
        style={styles.input}
        label="Kode Pos"
        placeholder="Masukkan kode pos resto ..."
      />

      {pinMapCoordinate ? (
        <View style={styles.mapWrapperActive}>
          <InputLabel text="Pin Maps :" />
          <MapView
            style={styles.mapView}
            provider={PROVIDER_GOOGLE}
            onRegionChange={() => {}}
            region={{
              longitude: pinMapCoordinate.longitude,
              latitude: pinMapCoordinate.latitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }}
            // initialRegion={{
            //   longitude: pinMapCoordinate.longitude,
            //   latitude: pinMapCoordinate.latitude,
            //   longitudeDelta: 0.02,
            //   latitudeDelta: 0.02,
            // }}
          >
            <Marker coordinate={pinMapCoordinate} style={styles.mapMarker}>
              <View>
                <Icon
                  name={IconName.mapMarkerResto}
                  color={Colors.brandPrimary}
                  style={styles.mapMarkerIcon}
                />
              </View>
            </Marker>
          </MapView>
          <Button
            style={styles.mapButtonActive}
            text="Ganti Maps"
            type="secondary"
            onPress={handleMapClick}
          />
        </View>
      ) : (
        <View style={styles.mapWrapper}>
          <InputLabel text="Pin Maps :" />
          <Button
            text="Tambah Maps"
            type="secondary"
            onPress={handleMapClick}
          />
        </View>
      )}

      <Button
        style={styles.submit}
        text="Selanjutnya"
        size="large"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </View>
  )
}

StepAddress.propTypes = {
  onValidSubmit: customPropTypes.functionWithParams(1),
  data: PropTypes.shape({
    address: PropTypes.string,
    kelurahan: PropTypes.string,
    kecamatan: PropTypes.string,
    postCode: PropTypes.string,
  }),
}

StepAddress.defaultProps = {
  onValidSubmit: data => {},
  data: {
    address: null,
    kelurahan: null,
    kecamatan: null,
    postCode: null,
    pinMap: null,
  },
}

const markerSize = 36
const styles = StyleSheet.create({
  wrapper: {},
  heading: {
    textAlign: "center",
  },
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
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
    height: 150,
    width: Dimensions.get("window").width - Spaces.container * 2,
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

export default StepAddress
