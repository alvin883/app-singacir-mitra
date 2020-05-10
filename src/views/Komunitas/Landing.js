import React, { Component, useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, Dimensions, Image } from "react-native"
import PropTypes from "prop-types"
import { Illustrations, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import { sample, navigationServices } from "_utils"
import { BlockList } from "_organisms"
import IllustrationCommunity from "_assets/images/illustration-community.png"

const gotoCommunity = ({ id, title }) => {
  console.log("KomunitasLanding - gotoCommunity: ", id, title)
  navigationServices.Navigate("komunitas/detail", {
    title: title,
    community_id: id,
    community_name: title,
  })
}

const gotoCreate = () => {
  navigationServices.Navigate("komunitas/edit-form")
}

const Landing = () => {
  return (
    <ScrollView>
      <View style={styles.hero}>
        <View style={styles.heroBg} />

        <Image source={IllustrationCommunity} style={styles.image} />

        <Button
          style={styles.create}
          text="Buat Komunitas"
          iconName={IconName.chevronRight}
          iconPosition="right"
          onPress={gotoCreate}
        />
      </View>

      <View style={styles.bottom}>
        <Button
          style={styles.search}
          type="secondary"
          text="Cari komunitas"
          iconName={IconName.chevronRight}
          iconPosition="right"
        />

        <BlockList
          itemFirstStyle={{ marginTop: 24 }}
          list={sample.KomunitasList}
          onItemPress={gotoCommunity}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 30,
    paddingHorizontal: Spaces.container,
  },
  heroBg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 18,
    left: 0,
    backgroundColor: Colors.themeLight,
  },
  image: {
    resizeMode: "contain",
    height: 200,
    width: Dimensions.get("window").width - Spaces.container * 2,
  },
  create: {
    marginTop: 20,
    alignSelf: "center",
  },
  bottom: {
    paddingVertical: 30,
    paddingHorizontal: Spaces.container,
  },
  search: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
})

export default Landing
