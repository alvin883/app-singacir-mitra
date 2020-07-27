import React, { useRef, useState } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types"
import { Heading, Input, Button, InputLabel, Infobox } from "_atoms"
import {
  customPropTypes,
  navigationServices,
  objectMap,
  validation,
  hexToRgb,
} from "_utils"
import { IconName, Icon } from "_c_a_icons"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { Spaces, Colors, FontSizes } from "_styles"

const DEFAULT_TEXT = {
  heading: "Alamat",
  addressLabel: "Alamat",
  addressPlaceholder: "Alamat lengkap resto ...",
  kelurahanLabel: "Kelurahan",
  kelurahanPlaceholder: "Masukkan kelurahan resto ...",
  kecamatanLabel: "Kecamatan",
  kecamatanPlaceholder: "Masukkan kecamatan resto ...",
  postCodeLabel: "Kode Pos",
  postCodePlaceholder: "Masukkan kode pos resto ...",
}

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
  text = DEFAULT_TEXT,
}) => {
  const _coordinate = defaultVal.coordinate ? defaultVal.coordinate : undefined
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    address: defaultVal.address,
    kelurahan: defaultVal.kelurahan,
    kecamatan: defaultVal.kecamatan,
    postCode: defaultVal.postCode,
    coordinate: _coordinate,
  })
  const [errorState, setErrorState] = useState(objectMap(state, () => null))

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkCoordinate = obj => {
    const isValid = obj?.longitude && obj?.latitude
    if (!isValid) return "Anda harus menambahkan Pin Map"
    return null
  }

  const onSubmit = () => {
    const data = state
    const errorAddress = checkExistField(state.address)
    const errorKelurahan = checkExistField(state.kelurahan)
    const errorKecamatan = checkExistField(state.kecamatan)
    const errorPostCode = checkExistField(state.postCode)
    const errorCoordinate = checkCoordinate(state.coordinate)
    // prettier-ignore
    const isNotValid = errorAddress || errorKelurahan || errorKecamatan || errorPostCode || errorCoordinate

    console.log("StepAddress-default", defaultVal)
    console.log("StepAddress-data", data)

    if (isNotValid) {
      setErrorState({
        ...errorState,
        address: errorAddress,
        kelurahan: errorKelurahan,
        kecamatan: errorKecamatan,
        postCode: errorPostCode,
        coordinate: errorCoordinate,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
  }

  const handleMapClick = () => {
    navigationServices.Navigate(pinMapRouteName, {
      markerIcon: iconMarker,
      markerCoor: state.coordinate,
      onSubmit: coor => {
        console.log("FormAddressData - PinMap.onSubmit: ", coor)
        setState({
          ...state,
          coordinate: coor,
        })
        setErrorState({
          ...errorState,
          coordinate: checkCoordinate(coor),
        })
        navigationServices.GoBack()
      },
    })
  }

  return (
    <View style={styles.wrapper}>
      {isFirstSetup && (
        <Heading
          style={styles.heading}
          text={text.heading || DEFAULT_TEXT.heading}
        />
      )}

      <Input
        label={text.addressLabel || DEFAULT_TEXT.addressLabel}
        placeholder={text.addressPlaceholder || DEFAULT_TEXT.addressPlaceholder}
        status={errorState.address ? "normal" : "warning"}
        warning={errorState.address}
        value={state.address}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            address: warning,
          })
          setState({
            ...state,
            address: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label={text.kelurahanLabel || DEFAULT_TEXT.kelurahanLabel}
        placeholder={
          text.kelurahanPlaceholder || DEFAULT_TEXT.kelurahanPlaceholder
        }
        status={errorState.kelurahan ? "normal" : "warning"}
        warning={errorState.kelurahan}
        value={state.kelurahan}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            kelurahan: warning,
          })
          setState({
            ...state,
            kelurahan: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label={text.kecamatanLabel || DEFAULT_TEXT.kecamatanLabel}
        placeholder={
          text.kecamatanPlaceholder || DEFAULT_TEXT.kecamatanPlaceholder
        }
        status={errorState.kecamatan ? "normal" : "warning"}
        warning={errorState.kecamatan}
        value={state.kecamatan}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            kecamatan: warning,
          })
          setState({
            ...state,
            kecamatan: text,
          })
        }}
      />

      <Input
        style={styles.input}
        label={text.postCodeLabel || DEFAULT_TEXT.postCodeLabel}
        placeholder={
          text.postCodePlaceholder || DEFAULT_TEXT.postCodePlaceholder
        }
        status={errorState.postCode ? "normal" : "warning"}
        warning={errorState.postCode}
        value={state.postCode}
        onChangeText={text => {
          const warning = checkExistField(text)
          setErrorState({
            ...errorState,
            postCode: warning,
          })
          setState({
            ...state,
            postCode: text,
          })
        }}
      />

      {state.coordinate ? (
        <View style={styles.mapWrapperActive}>
          <InputLabel text="Pin Maps :" />
          <MapView
            style={styles.mapView}
            provider={PROVIDER_GOOGLE}
            onRegionChange={() => {}}
            region={{
              longitude: state.coordinate.longitude,
              latitude: state.coordinate.latitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }}
            scrollEnabled={false}
            zoomEnabled={false}>
            <Marker coordinate={state.coordinate} style={styles.mapMarker}>
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

      {errorState.coordinate && (
        <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
          {errorState.coordinate}
        </Infobox>
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
  infobox: {
    marginTop: 10,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  infoboxText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
})

export default FormAddressData
