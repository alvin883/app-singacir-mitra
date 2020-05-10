import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import Map from "./Map"
import { ReviewAction, HeadingIcon } from "_molecules"
import { Spaces, FontSizes, FontFamily, Colors } from "_styles"
import { Heading, Content } from "_atoms"
import { IconName } from "_c_a_icons"
import { hexToRgb, sample } from "_utils"

const DATA = sample.RestoProfileAPI
const DATA2 = sample.RestoDetail
const DATA3 = sample.ScheduleAPI

class PreviewDetail extends Component {
  state = {
    rating: DATA2.rating,
    isFavorite: true,
    description: DATA.resto_description,
    address: DATA.address,
    phoneNumber: DATA.resto_phone_number,
    email: DATA.resto_email,
    longitude: DATA.long_coordinate,
    latitude: DATA.lat_coordinate,
    totalReviewers: DATA2.reviewers,
    schedule: DATA3,
  }

  onClickFavorite = () => {}

  render() {
    return (
      <ScrollView>
        <Map
          longitude={this.state.longitude}
          latitude={this.state.latitude}
          markerIconName={IconName.mapMarkerResto}
        />
        <View style={styles.wrapper}>
          <ReviewAction
            style={styles.ReviewAction}
            rating={this.state.rating}
            isFavorite={this.state.isFavorite}
            totalReviewers={this.state.totalReviewers}
            onClickFavorite={this.onClickFavorite}
          />
          <Heading text="Deskripsi" style={styles.Heading} />
          <Content style={styles.Content}>{this.state.description}</Content>
          <View style={styles.infoWrapper}>
            <HeadingIcon
              style={{ ...styles.HeadingIcon, marginTop: 0 }}
              iconName={IconName.mapMarker}
              text={this.state.address}
            />
            <HeadingIcon
              style={styles.HeadingIcon}
              iconName={IconName.phone}
              text={this.state.phoneNumber}
            />
            <HeadingIcon
              style={styles.HeadingIcon}
              iconName={IconName.email}
              text={this.state.email}
            />
          </View>
          <View style={styles.schedule}>
            <Heading text="Jam Buka" style={styles.Heading} />
            <View style={styles.scheduleItems}>
              {this.state.schedule.map((val, index) => {
                const redClass = val.is_open
                  ? {}
                  : { color: Colors.themeDanger }

                return (
                  <View key={index} style={styles.scheduleItem}>
                    <Text style={{ ...styles.scheduleKey, ...redClass }}>
                      {val.day}
                    </Text>
                    <Text style={{ ...styles.scheduleValue, ...redClass }}>
                      {val.is_open
                        ? val.opening_hours + " - " + val.closing_hours
                        : "Tutup"}
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
    paddingBottom: 40,
  },
  ReviewAction: {
    marginTop: 30,
  },
  Heading: {
    marginTop: 20,
    fontSize: FontSizes.medium,
  },
  Content: {
    marginTop: 14,
  },
  infoWrapper: {
    marginTop: 20,
  },
  HeadingIcon: {
    marginTop: 14,
  },
  schedule: {
    marginTop: 30,
  },
  scheduleItems: {
    marginTop: 14 - 8,
  },
  scheduleItem: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scheduleKey: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary),
  },
  scheduleValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary),
  },
})

export default PreviewDetail
