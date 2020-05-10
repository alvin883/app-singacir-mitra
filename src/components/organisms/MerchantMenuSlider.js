import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Heading } from "_atoms"
import { MerchantMenuSquare } from "_molecules"
import { Colors, FontSizes, Spaces } from "_styles"

// SET_API
// Here for templating menu item
const Items = ({ items, onItemClick }) =>
  items.map((item, index) => (
    <MerchantMenuSquare
      key={index}
      id={item.id}
      image={item.image}
      title={item.name}
      price={item.price}
      discount_price={item.discount_price}
      description={item.description}
      style={styles.item}
      onClick={onItemClick}
    />
  ))

const MerchantMenuSlider = ({ title, items, style, onItemClick }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Heading text={title} style={styles.heading} />
      <ScrollView
        style={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.itemWrapper}>
          <Items items={items} onItemClick={onItemClick} />
        </View>
      </ScrollView>
    </View>
  )
}

MerchantMenuSlider.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  style: ViewPropTypes.style,
}

const itemGutter = 5
const styles = StyleSheet.create({
  wrapper: {},
  heading: {
    marginHorizontal: Spaces.container,
    fontSize: FontSizes.large,
  },
  scroll: {
    marginTop: 30,
  },
  itemWrapper: {
    paddingHorizontal: Spaces.container - itemGutter,
    flexDirection: "row",
  },
  item: {
    marginHorizontal: itemGutter,
  },
})

export default MerchantMenuSlider
