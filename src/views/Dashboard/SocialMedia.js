import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import PropTypes from "prop-types"
import { Spaces, FontSizes, FontFamily, Colors } from "_styles"
import { hexToRgb } from "_utils"
import { Icon, IconName } from "_c_a_icons"

const Items = ({ items }) =>
  items.map((item, i) => (
    <TouchableOpacity
      key={i}
      style={{
        ...styles.button,
        backgroundColor: hexToRgb(item.color || Colors.brandSecondary, 0.1),
      }}
      onPress={() => Linking.openURL(item.url)}>
      <Icon
        name={item.iconName}
        style={styles.icon}
        color={item.color || Colors.brandSecondary}
      />
    </TouchableOpacity>
  ))

const SocialMedia = ({ title, items }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.buttons}>
      <Items items={items} />
    </View>
  </View>
)

SocialMedia.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30 - 20,
    paddingBottom: 30,
    paddingHorizontal: Spaces.container,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 24,
    width: 24,
  },
})

export default SocialMedia
