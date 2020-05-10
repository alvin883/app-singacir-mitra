import React from "react"
import { StyleSheet } from "react-native"
import {
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack"
import { ButtonStyle, Button } from "_atoms"
import { Colors, Spaces, FontSizes, FontFamily } from "_styles"
import { IconName } from "_c_a_icons"
import { navigationServices } from "_utils"

const headerLeft = ({ canGoBack, navigation, route }) => {
  /**
   * Only show back button, when react-navigation canGoBack or the screen
   * itself has parameter to force back button to appear
   */
  const isWithButton = canGoBack || (route.params && route.params.withGoBack)

  /**
   * Custom function when user click back button
   */
  const isCustomBackAction = route.params && route.params.customBackAction

  if (isWithButton) {
    return (
      <Button
        size="small"
        type="nude"
        baseColor={Colors.themeDark}
        iconName={IconName.arrowLeft}
        onPress={() => {
          if (isCustomBackAction) {
            route.params.customBackAction()
          } else {
            navigationServices.GoBack()
          }
        }}
      />
    )
  } else {
    return null
  }
}

const StackOptions = {
  screenOptions: ({ navigation, route }) => ({
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerTitleContainerStyle: styles.titleContainer,
    headerLeft: ({ canGoBack }) => headerLeft({ canGoBack, navigation, route }),
    headerLeftContainerStyle: styles.containerLeft,
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    ...TransitionPresets.SlideFromRightIOS,
  }),
}

/**
 * This is for title spacing,
 * to avoid the back button,
 * 'and also make the distibution space same as well
 */
const _margin = ButtonStyle.buttonSizeSmall.paddingHorizontal * 2
const titleMargin = 24 + Spaces.container + _margin

const styles = StyleSheet.create({
  header: {
    height: 67,
    backgroundColor: Colors.themeLight,
  },
  containerLeft: {
    padding: 0,
    paddingLeft: Spaces.container,
  },
  titleContainer: {
    // Overwrite Default style from React-Navigation
    // position: "relative",
    left: titleMargin,
    right: titleMargin,
    padding: 0,
    margin: 0,
    // -----------------------

    flex: 1,
    paddingLeft: Spaces.container,
    paddingRight: Spaces.container,
    textAlign: "center",
    // backgroundColor: "red",
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.large,
    fontFamily: FontFamily.bold,
  },
})

export default StackOptions
export const StackOptionsStyle = styles
