import React, { Component, useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import {
  Input,
  InputPhoto,
  Divider,
  Text,
  InputLabel,
  ImageWithFallback,
  Button,
} from "_atoms"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"
import { navigationServices } from "_utils"

class EditForm extends Component {
  state = {
    cover: this.props.route.params?.community_pict,
    defaultVal: this.props.route.params?.data,
    activities: [],
  }

  onSelectPhoto = image => {
    this.setState({ cover: image })
  }

  addActivity_onSubmit = (editIndex, activity) => {
    const isEditing = editIndex > -1
    const { activities } = this.state
    let newActivities

    if (isEditing) {
      newActivities = [...activities]
      newActivities[editIndex].name = activity.name
      newActivities[editIndex].image = activity.image
    } else {
      newActivities = [...activities, activity]
    }

    this.setState({
      activities: newActivities,
    })
  }

  addActivity_onEdit = activity => {}

  addActivity = (editIndex = -1) => {
    const isEditing = editIndex > -1
    const { activities } = this.state
    const editData = isEditing ? { data: activities[editIndex] } : {}

    navigationServices.Navigate("komunitas/add-activity", {
      onSubmit: this.addActivity_onSubmit,
      editIndex: editIndex,
      ...editData,
      routeTitle: isEditing ? "Edit Kegiatan" : "Tambah Kegiatan",
    })
  }

  render() {
    const isActivities = this.state.activities.length > 0
    const isEditing = this.props.route.params?.isEditing

    // console.log(this.state.defaultVal)
    // console.log("isEditing", this.props.route.params?.isEditing)

    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <Input
            style={{ ...styles.input, marginTop: 0 }}
            label="Nama"
            placeholder="Nama komunitas ..."
            defaultValue={this.state.defaultVal?.community_name}
          />
          <Input
            style={styles.input}
            label="Alamat"
            placeholder="Alamat komunitas ..."
            defaultValue={this.state.defaultVal?.address}
          />

          <Input
            style={styles.input}
            label="Nomor HP"
            placeholder="Nomor HP komunitas ..."
            keyboardType="phone-pad"
            defaultValue={this.state.defaultVal?.phone_number}
          />

          <Input
            style={styles.input}
            label="Email"
            placeholder="Email komunitas ..."
            keyboardType="email-address"
            defaultValue={this.state.defaultVal?.email}
          />

          <Input
            style={styles.input}
            label="Facebook Page"
            placeholder="Facebook page komunitas ..."
            defaultValue={this.state.defaultVal?.facebook_page}
          />

          <Input
            style={styles.input}
            label="Deskripsi"
            placeholder="Deskripsi komunitas ..."
            defaultValue={this.state.defaultVal?.description}
          />

          <InputPhoto
            style={styles.input}
            onSelectPhoto={this.onSelectPhoto}
            source={this.state.cover}
            labelText="Upload Cover"
            buttonText="Pilih Foto"
            buttonTextActive="Ganti Foto"
          />

          <Divider style={{ marginHorizontal: -Spaces.container }} />

          <View style={styles.activity}>
            <InputLabel text="Kegiatan" />
            {!isActivities && (
              <Text style={activityStyles.noItem}>Belum ada kegiatan</Text>
            )}
            {isActivities && (
              <View style={activityStyles.wrapper}>
                {this.state.activities.map((activity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={activityStyles.item}
                    onPress={() => this.addActivity(index)}>
                    <ImageWithFallback
                      style={activityStyles.image}
                      source={activity.image}
                    />
                    <Text style={activityStyles.name} weight="bold">
                      {activity.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Button
              style={styles.addActivity}
              type="secondary"
              text="Tambah Kegiatan"
              iconName={IconName.chevronRight}
              iconPosition="right"
              onPress={this.addActivity}
            />
          </View>

          <Button
            style={styles.submit}
            text={isEditing ? "Simpan" : "Submit"}
            size="large"
          />
        </View>
      </ScrollView>
    )
  }
}

const activityStyles = StyleSheet.create({
  wrapper: {
    // marginTop: ,
  },
  noItem: {
    opacity: 0.3,
    marginVertical: 14,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  name: {
    marginLeft: 14,
  },
})

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 40,
    paddingHorizontal: Spaces.container,
  },
  input: {
    marginTop: 26,
  },
  addActivity: {
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  submit: {
    marginTop: 40,
  },
})

export default EditForm
