import React from "react"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Button } from "_atoms"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"
import { ReviewAction, HeadingIcon } from "_molecules"

const HeaderInfo = ({
  rating,
  reviewers,
  address,
  facebookLink,
  isFavorite,
  onClickFavorite,
  onClickDetail,
  style,
}) => {
  const isActionButton = typeof onClickDetail === "function"
  return (
    <View style={{ ...styles.header, ...style }}>
      <ReviewAction
        rating={rating}
        totalReviewers={reviewers}
        facebookLink={facebookLink}
        isFavorite={isFavorite}
        onClickFavorite={onClickFavorite}
      />
      <HeadingIcon iconName={IconName.mapMarker} text={address} />

      {isActionButton && (
        <View style={styles.bottom}>
          <Button
            style={styles.bottomButton}
            type="secondary"
            text="Lihat Detail Resto"
            iconName={IconName.chevronRight}
            iconPosition="right"
            onPress={onClickDetail}
          />
        </View>
      )}
    </View>
  )
}

HeaderInfo.propTypes = {
  /**
   * NOTE: You don't need to specify `rating` props,
   * because it will be checked in RatingDisplay component instead
   */

  isFavorite: PropTypes.bool,
  address: PropTypes.string,
  onClickFavorite: PropTypes.func.isRequired,
  onClickDetail: PropTypes.func,
  style: ViewPropTypes.style,
}

HeaderInfo.defaultProps = {
  isFavorite: false,
  onClickFavorite: () => {},
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginHorizontal: Spaces.container,
  },
  bottom: {
    marginTop: 20,
  },
  bottomButton: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
})

export default HeaderInfo
