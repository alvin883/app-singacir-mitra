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

const FormAddressData = ({
  data: defaultVal,
  onValidSubmit,
  isFirstSetup,
  pinMapRouteName,
  iconMarker,
}) => {
  const refAddress = useRef()
  const refKelurahan = useRef()
  const refKecamatan = useRef()
  const refPostCode = useRef()

  const _coordinate = defaultVal.coordinate ? defaultVal.coordinate : undefined
  const [coordinate, setCoordinate] = useState(_coordinate)

  const [isLoading, setLoading] = useState(false)

  const onSubmit = () => {
    const address = refAddress.current.state.text
    const kelurahan = refKelurahan.current.state.text
    const kecamatan = refKecamatan.current.state.text
    const postCode = refPostCode.current.state.text

    const data = {
      address,
      kelurahan,
      kecamatan,
      postCode,
      coordinate,
    }

    setLoading(true)

    // TODO: data validation

    onValidSubmit(data)
  }

  const handleMapClick = () => {
    navigationServices.Navigate(pinMapRouteName, {
      markerIcon: iconMarker,
      markerCoor: coordinate,
      onSubmit: coor => {
        console.log("FormAddressData - PinMap.onSubmit: ", coor)

        setCoordinate(coor)
        navigationServices.GoBack()
      },
    })
  }

  return (
    <View style={styles.wrapper}>
      {isFirstSetup && <Heading style={styles.heading} text="Alamat" />}

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

      {coordinate ? (
        <View style={styles.mapWrapperActive}>
          <InputLabel text="Pin Maps :" />
          <MapView
            style={styles.mapView}
            provider={PROVIDER_GOOGLE}
            onRegionChange={() => {}}
            region={{
              longitude: coordinate.longitude,
              latitude: coordinate.latitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }}
            scrollEnabled={false}
            zoomEnabled={false}>
            <Marker coordinate={coordinate} style={styles.mapMarker}>
              <View>
                <Icon
                  name={iconMarker}
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
        text={isFirstSetup ? "Selanjutnya" : "Simpan"}
        size="large"
        onPress={onSubmit}
        state={isLoading ? "loading" : "default"}
      />
    </View>
  )
}

FormAddressData.propTypes = {
  onValidSubmit: customPropTypes.functionWithParams(1),
  data: PropTypes.shape({
    address: PropTypes.string,
    kelurahan: PropTypes.string,
    kecamatan: PropTypes.string,
    postCode: PropTypes.string,
  }),
  isFirstSetup: PropTypes.bool,
  iconMarker: PropTypes.string,

  /**
   * Route name destination when user want to set the Pin Map
   */
  pinMapRouteName: PropTypes.string.isRequired,
}

FormAddressData.defaultProps = {
  onValidSubmit: data => {},
  data: {
    address: null,
    kelurahan: null,
    kecamatan: null,
    postCode: null,
    coordinate: null,
  },
  isFirstSetup: true,
  iconMarker: IconName.mapMarkerMotoris,
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

export default FormAddressData
