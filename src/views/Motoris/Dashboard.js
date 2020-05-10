import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"
import { Text, Divider, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { Icon, IconName } from "_c_a_icons"
import { hexToRgb, navigationServices } from "_utils"

const DashboardButton = ({ iconName, text, onPress }) => {
  const rippleColor = hexToRgb(Colors.brandPrimary, 0.1)

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
        iconName={IconName.motocycle}
        text="Profil Motoris"
        onPress={() => navigationServices.Navigate("motoris/dashboard/profil")}
      />
      <DashboardButton
        iconName={IconName.money}
        text="Cairkan Saldo"
        onPress={() => {
          navigationServices.Navigate("motoris/dashboard/withdraw")
        }}
      />
      <DashboardButton
        iconName={IconName.menu}
        text="Daftar Kiriman"
        onPress={() => {
          navigationServices.Navigate("motoris/dashboard/daftar-kiriman")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
  },
})

export default Dashboard
