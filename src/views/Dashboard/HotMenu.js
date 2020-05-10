import React, { Component } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontSizes, FontFamily, Spaces } from "_styles"
import Carousel from "react-native-snap-carousel"

class HotMenu extends Component {
  static propTypes = {
    suptitl: PropTypes.string,
    items: PropTypes.array,
  }

  static defaultProps = {
    items: [],
  }

  state = {
    activeSlide: 0,
  }

  render() {
    const viewport = Dimensions.get("window")
    const { suptitle, items } = this.props
    const itemWidth = viewport.width - Spaces.container * 2
    const isShow = items.length > 0
    const renderItem = ({ item, index }) => (
      <Image source={item} style={styles.image} />
    )

    return (
      isShow && (
        <View style={styles.wrapper}>
          <Text style={styles.suptitle}>{suptitle}</Text>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={itemWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
        </View>
      )
    )
  }
}

const viewport = Dimensions.get("window")
const itemWidth = viewport.width - Spaces.container * 2
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginTop: 30,
    marginHorizontal: Spaces.container,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "red",
  },
  suptitle: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 2,
    fontSize: FontSizes.extraSmall,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
  image: {
    width: itemWidth,
    height: "auto",
    aspectRatio: 16 / 9,
  },
})

export default HotMenu
