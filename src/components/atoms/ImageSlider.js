import React, { Component } from "react"
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import PropTypes from "prop-types"
import Carousel from "react-native-snap-carousel"
import { Colors } from "_styles"

/**
 * @augments {Component<Slider.propTypes, {}>}
 */
class Slider extends Component {
  static propTypes = {
    images: PropTypes.array,
  }

  static defaultProps = {
    images: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      items: props.images,
      activeSlide: 0,
    }
  }

  render() {
    const { items, activeSlide } = this.state
    const viewport = Dimensions.get("window")
    const renderItem = ({ item, index }) => (
      <Image source={item} style={styles.image} />
    )

    const renderDot = index => (
      <View
        key={index}
        style={{
          ...styles.dot,
          opacity: index === activeSlide ? 1 : 0.2,
        }}></View>
    )

    const renderPagination = () => items.map((val, index) => renderDot(index))

    return (
      <View>
        <Carousel
          data={items}
          renderItem={renderItem}
          sliderWidth={viewport.width}
          itemWidth={viewport.width}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        <View style={styles.dots}>{renderPagination()}</View>
      </View>
    )
  }
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  item: {},
  image: {
    width: viewport.width,
    height: "auto",
    aspectRatio: 16 / 9,
  },
  dots: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: Colors.textPrimary,
  },
})

export default Slider
