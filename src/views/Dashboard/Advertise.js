import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces, FontFamily, Colors, FontSizes } from "_styles"
import { sourcePropType } from "_utils"

const Advertise = ({ imageSource, title, subtitle }) => (
  <ImageBackground style={styles.image} source={imageSource}>
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </ImageBackground>
)

Advertise.propTypes = {
  imageSource: sourcePropType,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  image: {
    width: viewport.width - Spaces.container * 2,
    marginHorizontal: Spaces.container,
    overflow: "hidden",
    borderRadius: 4,
  },
  wrapper: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
  subtitle: {
    marginTop: 2,
    textAlign: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.normal,
    color: Colors.themeLight,
  },
})

export default Advertise
