import React from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Button, RatingDisplay } from "_atoms"
import { FontSizes, FontFamily, Spaces, Colors } from "_styles"
import { Icon, IconName } from "_c_a_icons"
import { hexToRgb } from "_utils"
import { ReviewAction, HeadingIcon } from "_molecules"

const Header = ({
  rating,
  reviewers,
  address,
  isFavorite,
  onClickFavorite,
  onClickDetail,
}) => {
  return (
    <View style={styles.header}>
      <ReviewAction
        rating={rating}
        totalReviewers={reviewers}
        isFavorite={isFavorite}
        onClickFavorite={onClickFavorite}
      />
      <HeadingIcon iconName={IconName.mapMarker} text={address} />
      <View style={styles.bottom}>
        <Button
          style={styles.bottomButton}
          type="secondary"
          text="Lihat Detail Warung"
          iconName={IconName.chevronRight}
          iconPosition="right"
          onPress={onClickDetail}
        />
      </View>
    </View>
  )
}

Header.propTypes = {
  rating: RatingDisplay.propTypes.rating,
  isFavorite: PropTypes.bool,
  address: PropTypes.string,
  onClickFavorite: PropTypes.func.isRequired,
  onClickDetail: PropTypes.func.isRequired,
}

Header.defaultProps = {
  isFavorite: false,
  onClickFavorite: () => {},
  onClickDetail: () => {},
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

export default Header
