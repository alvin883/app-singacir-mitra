import React, { Component } from "react"
import { View, StyleSheet, ViewPropTypes, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { Content, RatingDisplay, ImageWithFallback, Text } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import { FontSizes, Colors } from "_styles"
import { hexToRgb, sourcePropType } from "_utils"

const BlockItem = ({
  image,
  name,
  address,
  time,
  distance,
  rating,
  style,
  onPress,
  type,
  makcomblangOwner,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.wrapper, ...style }}
      onPress={onPress}
      activeOpacity={0.4}>
      {/* Left */}
      <View style={styles.left}>
        <ImageWithFallback source={image} style={styles.image} />
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.rightTitle} weight="bold" numberOfLines={1}>
          {name}
        </Text>

        {type === "default" && (
          <Content style={styles.rightAddress} numberOfLines={2}>
            {address}
          </Content>
        )}

        {type === "makcomblang" && (
          <Content style={styles.rightAddress} numberOfLines={2}>
            {makcomblangOwner}
          </Content>
        )}

        <View style={styles.rightBottom}>
          {type === "default" && time && distance && (
            <View style={styles.rightBottomLeft}>
              <Icon
                name={IconName.clockOutline}
                style={styles.rightBottomIcon}
                color={hexToRgb(Colors.textPrimary, 0.8)}
              />
              <Content style={styles.rightBottomText}>
                {time} - {distance}
              </Content>
            </View>
          )}
          <RatingDisplay style={styles.rating} rating={rating} size="small" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

BlockItem.propTypes = {
  image: ImageWithFallback.propTypes.source,
  name: PropTypes.string,
  address: PropTypes.string,
  time: PropTypes.string,
  distance: PropTypes.string,
  rating: PropTypes.number,
  style: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["default", "makcomblang"]),
  makcomblangOwner: PropTypes.string,
}

BlockItem.defaultProps = {
  onPress: () => {},
  type: "default",
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  left: {},
  image: {
    height: 70,
    width: 70,
    borderRadius: 4,
  },
  right: {
    marginLeft: 14,
    flexGrow: 1,
  },
  rightTitle: {
    fontSize: FontSizes.medium,
  },
  rightAddress: {
    marginTop: 2,
    fontSize: FontSizes.normal,
  },
  rightBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  rightBottomLeft: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  rightBottomIcon: {
    height: 16,
    width: 16,
  },
  rightBottomText: {
    marginLeft: 4,
    fontSize: FontSizes.extraSmall,
  },
  rating: {},
})

export default BlockItem
