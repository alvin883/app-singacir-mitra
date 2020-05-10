/**
 * Originaly cloned from "rn-swipeable-panel"
 */

import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native"
import { useHeaderHeight, HeaderHeightContext } from "react-navigation-stack"

const FULL_HEIGHT = Dimensions.get("window").height
const FULL_WIDTH = Dimensions.get("window").width
const MIN_HEIGHT = 540
const IS_FIT = MIN_HEIGHT < FULL_HEIGHT - 100
const CONTAINER_HEIGHT = IS_FIT ? MIN_HEIGHT : FULL_HEIGHT - 100

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2,
}

const myEase = Easing.inOut(Easing.poly(2.5))
const myTime = 275

class SwipeablePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComponent: false,
      opacity: new Animated.Value(0),
      canScroll: false,
      status: STATUS.CLOSED,
    }
    this.pan = new Animated.ValueXY({ x: 0, y: CONTAINER_HEIGHT })
    this.oldPan = { x: 0, y: 0 }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.pan.setOffset({ x: this.pan.x._value, y: 0 })
        this.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentTop = this.pan.y._offset + gestureState.dy
        if (currentTop > 0) {
          this.pan.setValue({ x: 0, y: gestureState.dy })
        }
      },
      onPanResponderRelease: (evt, { vx, vy }) => {
        this.pan.flattenOffset()

        const distance = this.oldPan.y - this.pan.y._value
        const absDistance = Math.abs(distance)
        const { status } = this.state
        const { onlyLarge } = this.props

        if (status === STATUS.LARGE) {
          if (0 < absDistance && absDistance < 100) {
            this._animateToLargePanel()
          } else if (
            100 < absDistance &&
            absDistance < CONTAINER_HEIGHT - 200
          ) {
            if (onlyLarge) {
              this._animateClosingAndOnCloseProp(true)
            } else {
              this._animateToSmallPanel()
            }
          } else if (CONTAINER_HEIGHT - 200 < absDistance) {
            this._animateClosingAndOnCloseProp()
          }
        } else {
          if (distance < -100) {
            this._animateClosingAndOnCloseProp(false)
          } else if (distance > 0 && distance > 50) {
            this._animateToLargePanel()
          } else {
            this._animateToSmallPanel()
          }
        }
      },
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { isActive, openLarge, onlyLarge } = this.props

    if (prevProps.isActive !== isActive) {
      if (isActive) {
        if (openLarge || onlyLarge) {
          this.openLarge()
        } else {
          this.openDetails()
        }
      } else {
        this.closeDetails(true)
      }
    }
  }

  _animateClosingAndOnCloseProp = isCloseButtonPress => {
    this.closeDetails(isCloseButtonPress)
  }

  _animateToLargePanel = () => {
    this._animateSpringPan(0, 0, 200)
    this.setState({ canScroll: true, status: STATUS.LARGE })
    this.oldPan = { x: 0, y: 0 }
  }

  openLarge = () => {
    this.setState({
      showComponent: true,
      status: STATUS.LARGE,
      canScroll: true,
    })
    Animated.parallel([
      this._animateTimingPan(),
      this._animateTimingOpacity(1, 300),
    ])
    this.oldPan = { x: 0, y: 0 }
  }

  openDetails = () => {
    this.setState({ showComponent: true, status: STATUS.SMALL })
    Animated.parallel([
      this._animateTimingPan(0, FULL_HEIGHT - 400),
      this._animateTimingOpacity(1, 300),
    ])
    this.oldPan = { x: 0, y: FULL_HEIGHT - 400 }
  }

  closeDetails = isCloseButtonPress => {
    const { status } = this.state
    const duration = myTime
    const easing = isCloseButtonPress
      ? myEase //.bezier(0.98, -0.11, 0.44, 0.59)
      : Easing.linear

    Animated.parallel([
      this._animateTimingPan(0, FULL_HEIGHT, duration, easing),
      this._animateTimingOpacity(0, myTime),
    ])

    setTimeout(
      () => {
        this.setState({
          showComponent: false,
          canScroll: false,
          status: STATUS.CLOSED,
        })
        this.props.onClose()
      },
      status === STATUS.LARGE ? 450 : 250,
    )
  }

  onPressCloseButton = () => {
    this._animateClosingAndOnCloseProp(true)
  }

  _animateSpringPan = (x, y, duration) => {
    return Animated.spring(this.pan, {
      toValue: { x, y },
      easing: myEase, //.bezier(0.05, 1.35, 0.2, 0.95),
      duration: duration,
      useNativeDriver: true,
    }).start()
  }

  _animateTimingOpacity = (toValue, duration) => {
    return Animated.timing(this.state.opacity, {
      toValue,
      easing: myEase, //.bezier(0.5, 0.5, 0.5, 0.5),
      duration,
      useNativeDriver: true,
    }).start()
  }

  _animateTimingPan = (
    x = 0,
    y = 0,
    duration = myTime,
    easing = myEase, //.bezier(0.05, 1.35, 0.2, 0.95)
  ) => {
    return Animated.timing(this.pan, {
      toValue: { x, y },
      easing,
      duration,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { showComponent, opacity } = this.state
    const {
      noBackgroundOpacity,
      style,
      closeRootStyle,
      closeIconStyle,
    } = this.props

    return showComponent ? (
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <Animated.View
            style={{
              ...SwipeablePanelStyles.background,
              opacity,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}>
            <Animated.View
              style={{
                ...SwipeablePanelStyles.container,
                width: FULL_WIDTH,
                transform: this.pan.getTranslateTransform(),
                bottom: 0,
                ...style,
              }}
              {...this._panResponder.panHandlers}>
              <View
                style={SwipeablePanelStyles.scrollViewContentContainerStyle}>
                {this.props.children}
              </View>
            </Animated.View>
          </Animated.View>
        )}
      </HeaderHeightContext.Consumer>
    ) : null
  }
}

SwipeablePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  fullWidth: PropTypes.bool,
  onPressCloseButton: PropTypes.func,
  noBackgroundOpacity: PropTypes.bool,
  style: PropTypes.object,
  closeRootStyle: PropTypes.object,
  closeIconStyle: PropTypes.object,
  openLarge: PropTypes.bool,
  onlyLarge: PropTypes.bool,
}

SwipeablePanel.defaultProps = {
  style: {},
  onClose: () => {},
  fullWidth: true,
  closeRootStyle: {},
  closeIconStyle: {},
  openLarge: false,
  onlyLarge: false,
}

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    position: "absolute",
    height: CONTAINER_HEIGHT,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2,
  },
  scrollViewContentContainerStyle: {},
})

export default SwipeablePanel
