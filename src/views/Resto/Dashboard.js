import React, { useCallback } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  StatusBar,
} from "react-native"
import PropTypes from "prop-types"
import { Text, Divider, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { Icon, IconName } from "_c_a_icons"
import { hexToRgb, navigationServices } from "_utils"
import { useFocusEffect } from "@react-navigation/native"

const DashboardButton = ({ iconName, text, onPress }) => {
  const rippleColor = hexToRgb(Colors.brandPrimary, 0.1)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandResto)
      StatusBar.setBarStyle("light-content")
    }, []),
  )

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor)}
      onPress={onPress}>
      <View style={DashboardButtonStyles.wrapper}>
        <View style={DashboardButtonStyles.left}>
          <View style={DashboardButtonStyles.iconWrapper}>
            <Icon
              name={iconName}
              color={Colors.themeLight}
              style={DashboardButtonStyles.icon}
            />
          </View>
          <Text weight="bold" style={DashboardButtonStyles.text}>
            {text}
          </Text>
        </View>
        <View>
          <Icon name={IconName.chevronRight} />
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

DashboardButton.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

DashboardButton.defaultProps = {
  onPress: () => {},
}

const DashboardButtonStyles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: Spaces.container,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    height: 34,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: Colors.brandPrimary,
  },
  icon: {
    height: 20,
    width: 20,
  },
  text: {
    marginLeft: 10,
  },
})

const Dashboard = () => {
  return (
    <View style={styles.wrapper}>
      <DashboardButton
        iconName={IconName.store}
        text="Profil Resto"
        onPress={() => navigationServices.Navigate("resto/dashboard/profil")}
      />
      <DashboardButton
        iconName={IconName.account}
        text="Data Pribadi"
        onPress={() => navigationServices.Navigate("resto/dashboard/pemilik")}
      />
      <DashboardButton
        iconName={IconName.mapMarker}
        text="Alamat"
        onPress={() => navigationServices.Navigate("resto/dashboard/alamat")}
      />
      <DashboardButton
        iconName={IconName.calendar}
        text="Jam Operasional"
        onPress={() => navigationServices.Navigate("resto/dashboard/jadwal")}
      />
      <DashboardButton
        iconName={IconName.menu}
        text="Menu"
        onPress={() => navigationServices.Navigate("resto/dashboard/menu")}
      />
      <DashboardButton
        iconName={IconName.money}
        text="Cairkan Saldo"
        onPress={() => {
          navigationServices.Navigate("resto/dashboard/withdraw")
        }}
      />
      <DashboardButton
        iconName={IconName.menu}
        text="Atur Promo"
        onPress={() => {
          navigationServices.Navigate("resto/dashboard/promo")
        }}
      />

      <Divider />

      <Button
        style={styles.preview}
        type="secondary"
        text="Lihat Preview"
        iconName={IconName.chevronRight}
        iconPosition="right"
        onPress={() => navigationServices.Navigate("resto/dashboard/preview")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
    // marginHorizontal: Spaces.container,
  },
  preview: {
    width: Dimensions.get("window").width - Spaces.container * 2,
    justifyContent: "space-between",
    marginHorizontal: Spaces.container,
  },
})

export default Dashboard
