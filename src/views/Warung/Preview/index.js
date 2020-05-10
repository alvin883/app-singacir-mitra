import React, { Component, createContext } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  BackHandler,
} from "react-native"
import PropTypes from "prop-types"
import {
  ImageWithFallback,
  RatingDisplay,
  Heading,
  Button,
  Divider,
} from "_atoms"
import { sample, navigationServices } from "_utils"
import { Spaces, Colors } from "_styles"
import { MerchantMenuSlider, MerchantMenuList } from "_organisms"
import MenuSheet from "./MenuSheet"
import { IconName } from "_c_a_icons"
import { HeaderInfo } from "_organisms"
import { BottomSheet } from "_molecules"

const DATA = sample.RestoProfileAPI
const DATA2 = sample.RestoDetail
const DATA3 = sample.RestoMenu

class Preview extends Component {
  state = {
    data: {
      image: DATA.resto_cover_pict,
      name: DATA.resto_name,
      address: DATA.address,
      description: DATA.resto_description,
      time: DATA2.time,
      distance: DATA2.distance,
      rating: DATA2.rating,
      reviewers: DATA2.total_reviewers,
      itemPromo: DATA2.itemPromo,
      itemNew: DATA3,
      categories: DATA2.categories,
    },
    isSheetOpen: false,
    sheetData: {
      id: null,
      image: null,
      name: "",
      price: 0,
      discount_price: 0,
      description: "",
    },
    selectedItems: [],
    summary: {
      quantity: 0,
      totalPrice: 0,
    },
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
    const { isSheetOpen } = this.state
    const currentRouteName = navigationServices.CurrentRouteName()

    if (currentRouteName === "warung/dashboard/preview") {
      if (isSheetOpen) {
        // Back one step
        this.setState({ isSheetOpen: false })
      } else {
        // Back to previous screen
        this.props.navigation.goBack()
      }

      // You need to return true
      // in order to prevent back button
      return true
    }
  }

  // see itemSquare onClick events
  openSheet = ({ id, image, title, price, discount_price, description }) => {
    this.setState({
      isSheetOpen: true,
      sheetData: {
        id: id,
        image: image,
        name: title,
        price: price,
        discount_price: discount_price,
        description: description,
      },
    })
  }

  onSheetClose = () => {
    this.setState({
      isSheetOpen: false,
    })
  }

  gotoSearch = () => {}

  gotoDetail = () => {
    const { navigation, route } = this.props
    const params = route.params

    navigation.navigate("warung/dashboard/preview-detail", params)
  }

  gotoCheckout = () => {}

  render() {
    const { data, sheetData, summary } = this.state

    return (
      <View style={styles.l_wrapper}>
        <ScrollView style={styles.l_scroll}>
          <View style={styles.wrapper}>
            <ImageWithFallback style={styles.image} source={data.image} />
            <HeaderInfo
              rating={data.rating}
              reviewers={data.reviewers}
              address={data.address}
              isFavorite={true}
              onClickDetail={this.gotoDetail}
            />

            <Divider />

            <MerchantMenuSlider
              title="Promo"
              items={data.itemPromo}
              onItemClick={this.openSheet}
            />
            <View style={styles.search}>
              <Button
                style={styles.searchButton}
                text="Cari Menu"
                type="secondary"
                iconName={IconName.chevronRight}
                iconPosition="right"
                onPress={this.gotoSearch}
              />
            </View>

            <Divider />

            <MerchantMenuSlider
              title="Terbaru"
              items={data.itemPromo}
              onItemClick={this.openSheet}
            />

            {data.categories.map((category, index) => (
              <React.Fragment key={index}>
                <Divider />
                <MerchantMenuList
                  key={index}
                  title={category.title}
                  list={category.items}
                />
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <BottomSheet
          fullWidth={true}
          openLarge={true}
          onlyLarge={true}
          canScroll={false}
          isActive={this.state.isSheetOpen}
          onClose={this.onSheetClose}>
          <MenuSheet {...sheetData} onClose={this.onSheetClose} />
        </BottomSheet>
      </View>
    )
  }
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 60,
  },
  image: {
    width: viewport.width,
    height: "auto",
    aspectRatio: 16 / 9,
  },
  search: {
    marginTop: 20,
    paddingHorizontal: Spaces.container,
  },
  searchButton: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  l_wrapper: {
    flex: 1,
  },
  l_scroll: {
    flex: 1,
  },
  l_bottom: {
    flex: 0,
  },
})

export default Preview
