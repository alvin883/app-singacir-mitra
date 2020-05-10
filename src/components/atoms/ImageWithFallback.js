import React, { Component } from "react"
import { Image, View, Text, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontSizes, FontFamily } from "_styles"
import { customPropTypes } from "_utils"

const ImageWithFallback = ({
  source,
  placeholderText,
  style,
  placeholderStyle,
  placeholderTextStyle,
}) => {
  if (source) {
    if (typeof source === "string") {
      return <Image source={{ uri: source }} style={style} />
    } else {
      return <Image source={source} style={style} />
    }
  } else {
    return (
      <View style={{ ...style, ...styles.placeholder, ...placeholderStyle }}>
        <Text style={{ ...styles.placeholderText, ...placeholderTextStyle }}>
          {placeholderText}
        </Text>
      </View>
    )
  }
}

ImageWithFallback.propTypes = {
  source: PropTypes.oneOfType([customPropTypes.imageSource, PropTypes.string]),
  placeholderText: PropTypes.string,
  style: ViewPropTypes.style,
  placeholderStyle: ViewPropTypes.style,
  placeholderTextStyle: Text.propTypes.style,
}

ImageWithFallback.defaultProps = {
  placeholderText: "IMAGE",
  style: {},
  placeholderStyle: {},
  placeholderTextStyle: {},
}

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.themeImgPlaceholder,
  },
  placeholderText: {
    fontSize: FontSizes.extraSmall,
    fontFamily: FontFamily.bold,
    opacity: 0.3,
  },
})

export default ImageWithFallback
