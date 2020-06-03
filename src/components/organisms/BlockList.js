import React from "react"
import { StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { BlockItem } from "_molecules"

const BlockList = ({
  list,
  itemStyle,
  itemFirstStyle,
  onItemPress,
  type,
  makcomblangOwner,
}) =>
  list.map((item, index) => {
    const isFirst = index === 0
    const _style = { ...styles.item, ...itemStyle }
    const thisStyle = isFirst ? { ..._style, ...itemFirstStyle } : _style

    return (
      <BlockItem
        key={index}
        style={thisStyle}
        image={item.image}
        name={item.name}
        address={item.address}
        time={item.time}
        distance={item.distance}
        rating={item.rating}
        onPress={() => onItemPress({ id: item.id, title: item.name })}
        type={type}
        makcomblangOwner={item.owner}
      />
    )
  })

BlockList.propTypes = BlockItem.propTypes
BlockList.defaultProps = BlockItem.defaultProps

const styles = StyleSheet.create({
  item: {
    marginTop: 26,
  },
})

export default BlockList
