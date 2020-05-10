import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Colors, Spaces, FontFamily, FontSizes } from "_styles"
import { Content } from "_atoms"

const Promo = ({ suptitle, title, content }) => (
  <View style={styles.card}>
    <Text style={styles.suptitle}>{suptitle}</Text>
    <Text style={styles.title}>{title}</Text>
    <Content style={styles.content}>{content}</Content>
  </View>
)

Promo.propTypes = {
  suptitle: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginHorizontal: Spaces.container,
    marginBottom: 30,
    borderRadius: 4,
    backgroundColor: Colors.themeLight,
  },
  suptitle: {
    fontSize: FontSizes.extraSmall,
    fontFamily: FontFamily.bold,
    color: Colors.brandPrimary,
  },
  title: {
    marginTop: 8,
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  content: {
    marginTop: 10,
  },
})

export default Promo
