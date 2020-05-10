import React from "react"
import { View, StyleSheet } from "react-native"
import { Avatar, Text, Button } from "_atoms"
import { Spaces, Colors } from "_styles"

const ProfileHeader = ({ photo, name, role, onClickEdit }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <View>
          <Avatar
            source={photo}
            name={name}
            style={styles.avatar}
            imageStyle={styles.avatar}
          />
        </View>
        <View style={styles.leftContent}>
          <Text size="medium" weight="bold">
            {name}
          </Text>
          <View style={styles.role}>
            <Text style={styles.roleText} size="small">
              {role}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          text="Edit"
          type="secondary"
          size="small"
          onPress={onClickEdit}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    marginLeft: 14,
  },
  avatar: {
    height: 60,
    width: 60,
    backgroundColor: Colors.brandPrimary,
  },
  role: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: Colors.brandSecondary,
  },
  roleText: {
    color: Colors.themeLight,
  },
})

export default ProfileHeader
