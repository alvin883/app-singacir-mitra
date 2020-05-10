import React, { Component, useEffect } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
} from "react-native"
import PropTypes from "prop-types"
import { Text, Content, Button } from "_atoms"
import { Spaces } from "_styles"

import IllustrationsSuccess from "_assets/images/illustration-success.png"
import { navigationServices } from "_utils"

const Success = ({ navigation, route }) => {
  // Passed value from route.params
  const fromRoute = {
    title: route.params?.title,
    content: route.params?.content,
    illustration: route.params?.illustration,
    action: route.params?.action,
    actionText: route.params?.actionText,
    backAction: route.params?.backAction,
  }

  // Default values
  const defaultVal = {
    title: "Menunggu Persetujuan",
    content: `Kami akan mereview pengajuan kemitraan untuk resto anda, dan ketika semua selesai kami akan memberitahu anda.`,
    illustration: IllustrationsSuccess,
    action: () => navigation.popToTop(),
    actionText: "Kembali ke Beranda",
  }

  const title = fromRoute.title || defaultVal.title
  const content = fromRoute.content || defaultVal.content
  const illustration = fromRoute.illustration || defaultVal.illustration
  const action = fromRoute.action || defaultVal.action
  const actionText = fromRoute.actionText || defaultVal.actionText

  const handleBackPress = () => {
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === route.name

    /**
     * Check whether this event occur when screen is still active or not,
     * Why you need check this? don't it handled by componentWillUnmount?
     * No, componentWillUnmount will take some times to trigger due to the
     * sliding transition each screen, so componentWillUnmout will not be
     * triggered imediately
     *
     *
     * also check is there passed param for backAction, if passed then
     * whenever user goBack, trigger the function instead
     */
    if (isActiveScreen && fromRoute.backAction) {
      fromRoute.backAction()

      // You need to return true
      // in order to prevent back button
      return true
    }

    // Back to previous screen
    return false
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  })

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Image source={illustration} style={styles.image} />
        <Text weight="bold" style={styles.title}>
          {title}
        </Text>
        <Content style={styles.content}>{content}</Content>
        <Button
          style={styles.button}
          size="large"
          text={actionText}
          onPress={action}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spaces.container,
    marginVertical: 30,
  },
  image: {
    resizeMode: "contain",
    height: 200,
    width: Dimensions.get("window").width - Spaces.container * 2,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  content: {
    marginTop: 20,
  },
  button: {
    marginTop: 40,
  },
})

export default Success
