import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces, FontSizes, FontFamily, Colors } from "_styles"
import Batik from "_assets/images/batik.jpeg"
import { hexToRgb } from "_utils"
import { Icon, IconName } from "_c_a_icons"

const SemarBox = () => {
  return (
    <ImageBackground
      source={Batik}
      style={styles.boxBackground}
      resizeMode="cover">
      <View style={styles.box}>
        <Text style={styles.title}>Kantong Semar</Text>
        <View style={styles.buttons}>
          {/* Donasi */}
          <TouchableOpacity style={styles.button} activeOpacity={0.5}>
            <Icon name={IconName.wallet} color={Colors.themeLight} />
            <Text style={styles.buttonText}>Donasi</Text>
          </TouchableOpacity>

          {/* Topup */}
          <TouchableOpacity style={styles.button} activeOpacity={0.5}>
            <Icon name={IconName.plus} color={Colors.themeLight} />
            <Text style={styles.buttonText}>Topup</Text>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity style={styles.button} activeOpacity={0.5}>
            <Icon name={IconName.dotsHorizontal} color={Colors.themeLight} />
            <Text style={styles.buttonText}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}
const boxWidth = Dimensions.get("window").width - Spaces.container * 2
const styles = StyleSheet.create({
  box: {
    backgroundColor: hexToRgb(Colors.brandPrimary, 0.85),
  },
  boxBackground: {
    width: boxWidth,
    overflow: "hidden",
    marginVertical: 30,
    marginHorizontal: Spaces.container,
    borderRadius: 4,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
  buttons: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: boxWidth / 3,
    alignItems: "center",
  },
  buttonText: {
    marginTop: 4,
    fontSize: FontSizes.extraSmall,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
})

export default SemarBox
