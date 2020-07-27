import React, { Component, useState, useEffect, useCallback } from "react"
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native"
import PropTypes from "prop-types"
import { Illustrations, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import { sample, navigationServices } from "_utils"
import { BlockList } from "_organisms"
import IllustrationMakcomblang from "_assets/images/illustration-makcomblang.png"
import { useFocusEffect } from "@react-navigation/native"

const Landing = () => {
  const gotoDetail = ({ id, title }) => {
    console.log("MakComblangLanding - gotoDetail: ", id, title)
    navigationServices.Navigate("makcomblang/detail", {
      title: title,
      community_id: id,
      community_name: title,
    })
  }

  const gotoRegister = () => {
    console.log("MakComblangLanding - gotoRegister")
    navigationServices.Navigate("makcomblang/register")
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandMakcomblang)
      StatusBar.setBarStyle("light-content")
    }, []),
  )

  return (
    <ScrollView>
      <View style={styles.hero}>
        <View style={styles.heroBg} />

        <Image source={IllustrationMakcomblang} style={styles.image} />

        <Button
          style={styles.create}
          text="Daftar Mak Comblang"
          iconName={IconName.chevronRight}
          iconPosition="right"
          onPress={gotoRegister}
        />
      </View>

      <View style={styles.bottom}>
        <Button
          style={styles.search}
          type="secondary"
          text="Cari mak comblang"
          iconName={IconName.chevronRight}
          iconPosition="right"
        />

        <BlockList
          itemFirstStyle={{ marginTop: 24 }}
          list={sample.MakcomblangList}
          onItemPress={gotoDetail}
          type="makcomblang"
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
