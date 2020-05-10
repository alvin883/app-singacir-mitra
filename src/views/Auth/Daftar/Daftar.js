import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native"
import PropTypes from "prop-types"
import { Spaces } from "_styles"
import { Stepper } from "_atoms"
import { navigationServices } from "_utils"
import DataPribadi from "./DataPribadi"
import DataUsaha from "./DataUsaha"
import DataPassword from "./DataPassword"

class Daftar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackpress,
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackpress = () => {
    const { current } = this.state
    const currentRouteName = navigationServices.CurrentRouteName()
    const isActiveScreen = currentRouteName === "Daftar"

    /**
     * Check whether this event occur when screen is still active or not,
     * Why you need check this? don't it handled by componentWillUnmount?
     * No, componentWillUnmount will take some times to trigger due to the
     * sliding transition each screen, so componentWillUnmout will not be
     * triggered imediately
     */
    if (!isActiveScreen) return false

    if (current > 0) {
      // Back one step
      this.setState(prevState => ({ current: prevState.current - 1 }))
    } else {
      // Back to previous screen
      this.props.navigation.goBack()
    }

    // You need to return true
    // in order to prevent back button
    return true
  }

  onNext = () => {
    console.log("click")
    this.setState(prevState => ({
      current: prevState.current + 1,
    }))
  }

  render() {
    const { current } = this.state
    const steps = [
      <DataUsaha onNext={this.onNext} />,
      <DataPribadi onNext={this.onNext} />,
      <DataPassword />,
    ]

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Stepper total={steps.length} current={current + 1} />
          </View>
          <View style={styles.bottom}>{steps[current]}</View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spaces.container,
  },
  top: {
    marginTop: 20,
  },
  bottom: {
    marginBottom: 40,
  },
})

export default Daftar
