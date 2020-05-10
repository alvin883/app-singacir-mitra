import React, { Component } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Text } from "_atoms"
import { BlockList } from "_organisms"
import { sample, navigationServices } from "_utils"
import { Spaces } from "_styles"

const Mine = () => {
  const gotoCommunity = ({ id, title }) => {
    console.log("KomunitasLanding - gotoCommunity: ", id, title)
    navigationServices.Navigate("komunitas/detail", {
      title: title,
      community_id: id,
      community_name: title,
      isEditable: true,
    })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
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
  wrapper: {
    paddingVertical: 30,
    paddingHorizontal: Spaces.container,
  },
})

export default Mine
