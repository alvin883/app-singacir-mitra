import React, { Component, useCallback, useState } from "react"
import { View, ScrollView, StyleSheet, StatusBar } from "react-native"
import PropTypes from "prop-types"
import {
  Text,
  ImageWithFallback,
  ImageSlider,
  Divider,
  Content,
  Button,
} from "_atoms"
import { HeaderInfo } from "_organisms"
import { sample, navigationServices } from "_utils"
import { ReviewAction, HeadingIcon } from "_molecules"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"

// TODO: Remove this one
import Sample1 from "_assets/images/sample-1.jpg"
import Sample2 from "_assets/images/sample-2.jpg"
import Sample3 from "_assets/images/sample-3.jpg"
import Sample4 from "_assets/images/sample-4.jpg"
import { useFocusEffect } from "@react-navigation/native"

const DATA = sample.KomunitasDetail

const Slider = ({ activities }) => (
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={SliderStyles.wrapper}>
    <View style={SliderStyles.itemWrapper}>
      {activities.map((activity, index) => (
        <View key={index} style={SliderStyles.item}>
          <ImageWithFallback
            style={SliderStyles.image}
            source={activity.image}
          />
          <Text style={SliderStyles.text} weight="bold" size="small">
            {activity.name}
          </Text>
        </View>
      ))}
    </View>
  </ScrollView>
)

const itemGutter = 5
const SliderStyles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  itemWrapper: {
    paddingHorizontal: Spaces.container - itemGutter,
    flexDirection: "row",
  },
  item: {
    marginHorizontal: itemGutter,
  },
  image: {
    width: 150,
    height: "auto",
    aspectRatio: 4 / 3,
    borderRadius: 4,
  },
  text: {
    marginTop: 10,
  },
})

const Detail = ({ route, navigation }) => {
  const isEditable = route.params?.isEditable
  const [state, setState] = useState({
    name: route.params.community_name,
    members: DATA.members,
    rating: DATA.rating,
    reviewers: DATA.reviewers,
    description: DATA.description,
    facebookLink: DATA.faceboook || null,
    address: DATA.address,
    phoneNumber: DATA.phoneNumber,
    email: DATA.email,
    activities: DATA.activities,
  })

  function onEdit() {
    navigationServices.Navigate("komunitas/edit-form", {
      data: {
        community_name: state.name,
        address: state.address,
        phone_number: state.phoneNumber,
        email: state.email,
        facebook_page: state.facebookLink,
        description: state.description,
      },
      isEditing: route.params?.isEditable,
    })
  }

  function onJoin() {
    console.log("Detail.js - onJoin, gabung komunitas ...")
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     StatusBar.setBackgroundColor(Colors.brandKomunitas)
  //     StatusBar.setBarStyle("light-content")
  //   }, []),
  // )

  return (
    <ScrollView>
      <ImageSlider images={[Sample1, Sample2, Sample3]} />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text weight="bold" size="medium">
            {state.name}
          </Text>
          <Text style={styles.members} size="small">
            {state.members} Anggota
          </Text>

          <ReviewAction
            style={styles.reviewAction}
            rating={state.rating}
            totalReviewers={state.reviewers}
            facebookLink={state.facebookLink}
          />
        </View>

        <Divider />

        <View style={styles.container}>
          <Text weight="bold" size="medium">
            Deskripsi
          </Text>
          <Content style={styles.description}>{state.description}</Content>

          <HeadingIcon
            style={{ ...styles.headingIcon, marginTop: 20 }}
            iconName={IconName.mapMarker}
            text={state.address}
          />
          <HeadingIcon
            style={styles.headingIcon}
            iconName={IconName.phone}
            text={state.phoneNumber}
          />
          <HeadingIcon
            style={styles.headingIcon}
            iconName={IconName.email}
            text={state.email}
          />
        </View>

        <Divider />

        <View style={styles.container}>
          <Text weight="bold" size="medium">
            Kegiatan
          </Text>
        </View>

        <Slider activities={state.activities} />

        {isEditable ? (
          <View style={styles.container}>
            <Button
              style={{ marginTop: 40 }}
              text="Edit"
              size="large"
              onPress={onEdit}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Button
              style={{ marginTop: 40 }}
              text="Gabung"
              size="large"
              onPress={onJoin}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

// class Detail extends Component {
//   state = {
//     name: this.props.route.params.community_name,
//     members: DATA.members,
//     rating: DATA.rating,
//     reviewers: DATA.reviewers,
//     description: DATA.description,
//     facebookLink: DATA.faceboook || null,
//     address: DATA.address,
//     phoneNumber: DATA.phoneNumber,
//     email: DATA.email,
//     activities: DATA.activities,
//   }

//   onEdit = () => {
//     navigationServices.Navigate("komunitas/edit-form", {
//       data: {
//         community_name: this.state.name,
//         address: this.state.address,
//         phone_number: this.state.phoneNumber,
//         email: this.state.email,
//         facebook_page: this.state.facebookLink,
//         description: this.state.description,
//       },
//       isEditing: this.props.route.params?.isEditable,
//     })
//   }

//   onJoin = () => {
//     console.log("Detail.js - onJoin, gabung komunitas ...")
//   }

//   render() {
//     const isEditable = this.props.route.params?.isEditable

//     return (
//       <ScrollView>
//         <ImageSlider images={[Sample1, Sample2, Sample3]} />
//         <View style={styles.wrapper}>
//           <View style={styles.container}>
//             <Text weight="bold" size="medium">
//               {this.state.name}
//             </Text>
//             <Text style={styles.members} size="small">
//               {this.state.members} Anggota
//             </Text>

//             <ReviewAction
//               style={styles.reviewAction}
//               rating={this.state.rating}
//               totalReviewers={this.state.reviewers}
//               facebookLink={this.state.facebookLink}
//             />
//           </View>

//           <Divider />

//           <View style={styles.container}>
//             <Text weight="bold" size="medium">
//               Deskripsi
//             </Text>
//             <Content style={styles.description}>
//               {this.state.description}
//             </Content>

//             <HeadingIcon
//               style={{ ...styles.headingIcon, marginTop: 20 }}
//               iconName={IconName.mapMarker}
//               text={this.state.address}
//             />
//             <HeadingIcon
//               style={styles.headingIcon}
//               iconName={IconName.phone}
//               text={this.state.phoneNumber}
//             />
//             <HeadingIcon
//               style={styles.headingIcon}
//               iconName={IconName.email}
//               text={this.state.email}
//             />
//           </View>

//           <Divider />

//           <View style={styles.container}>
//             <Text weight="bold" size="medium">
//               Kegiatan
//             </Text>
//           </View>

//           <Slider activities={this.state.activities} />

//           {isEditable ? (
//             <View style={styles.container}>
//               <Button
//                 style={{ marginTop: 40 }}
//                 text="Edit"
//                 size="large"
//                 onPress={this.onEdit}
//               />
//             </View>
//           ) : (
//             <View style={styles.container}>
//               <Button
//                 style={{ marginTop: 40 }}
//                 text="Gabung"
//                 size="large"
//                 onPress={this.onJoin}
//               />
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     )
//   }
// }

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    paddingBottom: 40,
  },
  container: {
    paddingHorizontal: Spaces.container,
  },
  members: {
    opacity: 0.8,
  },
  reviewAction: {
    marginTop: 4,
  },
  description: {
    marginTop: 20,
  },
  headingIcon: {
    marginTop: 14,
  },
})

export default Detail
