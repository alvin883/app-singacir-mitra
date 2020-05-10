import React from "react"
import { View, Text, StyleSheet, ViewPropTypes, Linking } from "react-native"
import PropTypes from "prop-types"
import { RatingDisplay, Button } from "_atoms"
import { FontSizes, FontFamily, Colors } from "_styles"
import { IconName } from "_c_a_icons"

const gotoFacebook = link => {
  Linking.canOpenURL(link).then(supported => {
    if (supported) {
      Linking.openURL(link)
    } else {
      alert("We can't open a browser for you, try to enable browser permission")
    }
  })
}

const ReviewAction = ({
  style,
  rating,
  totalReviewers,
  facebookLink,
  isFavorite,
  onClickFavorite,
}) => {
  const heartColor = isFavorite ? "#ff0000" : Colors.themeInactiveButton

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <View style={styles.left}>
        <RatingDisplay rating={rating} />
        <Text style={styles.reviewers}>({totalReviewers} Reviews)</Text>
      </View>
      <View style={styles.right}>
        {facebookLink && (
          <Button
            type="nude"
            shape="circle"
            iconName={IconName.facebook}
            iconStyle={styles.actionIcon}
            baseColor={heartColor}
            onPress={() => gotoFacebook(facebookLink)}
          />
        )}

        <Button
          type="nude"
          shape="circle"
          iconName={IconName.heart}
          iconStyle={styles.actionIcon}
          baseColor={heartColor}
          onPress={onClickFavorite}
        />
        <Button
          type="nude"
          shape="circle"
          iconName={IconName.share}
          iconStyle={styles.actionIcon}
          baseColor={Colors.themeInactiveButton}
        />
      </View>
    </View>
  )
}

ReviewAction.propTypes = {
  /**
   * NOTE: You don't need to specify `rating` props,
   * because it will be checked in RatingDisplay component instead
   */

  style: ViewPropTypes.style,
  totalReviewers: PropTypes.number,
  facebookLink: PropTypes.string,
  isFavorite: PropTypes.bool,
  onClickFavorite: PropTypes.func.isRequired,
}

ReviewAction.defaultProps = {
  style: {},
  totalReviewers: 0,
  isFavorite: false,
  onClickFavorite: () => {},
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewers: {
    marginLeft: 10,
    fontSize: FontSizes.normal,
    fontFamily: FontFamily.normal,
  },
  right: {
    flexDirection: "row",
  },
})

export default ReviewAction
