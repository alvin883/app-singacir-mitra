import React, { Component } from "react"
import {
  View,
  Text,
  ViewPropTypes,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"
import InputLabel from "./InputLabel"
import { sourcePropType, permission } from "_utils"
import Button from "./Button"
import { Spaces } from "_styles"
import ImagePicker from "react-native-image-picker"

const InputPhoto = ({
  style,
  labelStyle,
  labelText,
  pickerText,
  buttonText,
  buttonTextActive,
  source,
  onSelectPhoto,
}) => {
  const ImagePickerOptions = {
    title: pickerText,
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  }

  const handleClick = () => {
    let image, error

    ImagePicker.showImagePicker(ImagePickerOptions, res => {
      if (res.didCancel) {
        console.log("Picker - Cancel")
      } else if (res.error) {
        if (res.error === "Permissions weren't granted") {
          // TODO: Make a brute test for this one
          permission
            .camera()
            .then(() => handleClick())
            .catch(permissionRes => {
              if (permissionRes.denied) {
                error = "Permission Denied"
                console.log("we couldn't work without this permission")
                // return {error: error}
              }
            })
        }
      } else if (res.customButton) {
        console.log("Picker - Custom Button: ", res.customButton)
      } else {
        image = { uri: res.uri }

        return onSelectPhoto(image)
      }
    })
  }

  if (!source) {
    return (
      <View style={{ ...style, ...styles.wrapper }}>
        <InputLabel text={labelText} style={labelStyle} />
        <Button text={buttonText} type="secondary" onPress={handleClick} />
      </View>
    )
  } else {
    const isURLSource = typeof source === "string"
    const usedSource = isURLSource ? { uri: source } : source

    return (
      <View style={{ ...style, ...styles.wrapperActive }}>
        <InputLabel text={labelText} style={labelStyle} />
        <Image source={usedSource} style={styles.photo} />
        <Button
          style={styles.buttonActive}
          text={buttonTextActive ? buttonTextActive : buttonText}
          type="secondary"
          onPress={handleClick}
        />
      </View>
    )
  }
}

InputPhoto.propTypes = {
  style: ViewPropTypes.style,
  labelStyle: Text.propTypes.style,
  labelText: PropTypes.string,
  pickerText: PropTypes.string,
  buttonText: PropTypes.string,
  /**
   * Button Text when there's already a source provided,
   * in other words user have selected a photo
   */
  buttonTextActive: PropTypes.string,
  source: PropTypes.oneOfType([sourcePropType, PropTypes.string]),
  onSelectPhoto: PropTypes.func.isRequired,
}

InputPhoto.defaultProps = {
  pickerText: "Pilih Foto",
  buttonText: "Pilih Foto",
  buttonTextActive: "Ganti Foto",
  onSelectPhoto: image => {},
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photo: {
    width: 250,
    height: 150,
    maxWidth: viewport.width - Spaces.container * 2,
    aspectRatio: 16 / 9,
    alignSelf: "center",
    marginTop: 14,
  },
  wrapperActive: {},
  buttonActive: {
    marginTop: 14,
    alignSelf: "center",
  },
})

export default InputPhoto
