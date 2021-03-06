import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import { View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Input, Button, InputPhoto, InputLabel, Text } from "_atoms"
import { IconName } from "_c_a_icons"
import { Spaces, Colors } from "_styles"
import {
  customPropTypes,
  navigationServices,
  validation,
  objectMap,
} from "_utils"

const FormMenuData = ({
  onValidSubmit,
  data: defaultVal,
  editPromoRouteName,
}) => {
  const refName = useRef()
  const refPrice = useRef()
  const refDescription = useRef()

  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: defaultVal?.menu_name || null,
    price: defaultVal?.menu_price || null,
    description: defaultVal?.menu_description || null,
    promoPrice: defaultVal?.promo_price || null,
    promoStart: defaultVal?.promo_start || null,
    promoEnd: defaultVal?.promo_end || null,
    promoDescription: defaultVal?.promo_description || null,
    menuPict: defaultVal?.menu_pict || null,
    // pedagangId: null,
    // mitraId: null,
  })
  const [errorState, setErrorState] = useState(objectMap(state, val => null))

  const [error, setError] = useState({
    name: null,
    price: null,
  })

  const initMenuPict = defaultVal?.menu_pict
  const initDiscount = {
    promo_price: defaultVal?.promo_price,
    promo_start: defaultVal?.promo_start,
    promo_end: defaultVal?.promo_end,
    promo_description: defaultVal?.promo_description,
  }

  const [menuPict, setMenuPict] = useState(initMenuPict)
  const [discount, setDiscount] = useState(initDiscount)

  const checkExistField = str => {
    return validation.validate("general", str)
  }

  const checkFilled = value => {
    if (!value) return "Kolom ini tidak boleh kosong"
    return null
  }

  const checkOptional = str => {
    return null
  }

  const onInputChange = (value, field, validateFunc = checkExistField) => {
    setState({
      ...state,
      [field]: value,
    })
    setErrorState({
      ...errorState,
      [field]: validateFunc(value),
    })
  }

  const onClickPromo = () => {
    navigationServices.Navigate(editPromoRouteName, {
      data: discount,
      onValidSubmit: data => {
        setDiscount(data)
        navigationServices.GoBack()
      },
    })
  }

  const onSelectImage = image => {
    setMenuPict(image)
  }

  const onSubmit = () => {
    // const name = refName.current.state.text
    // const price = refPrice.current.state.text
    // const description = refDescription.current.state.text

    // const data = {
    //   menu_name: name,
    //   menu_price: parseInt(price),
    //   menu_description: description,
    //   menu_pict: menuPict,
    //   promo_price: discount.promo_price,
    //   promo_start: discount.promo_start,
    //   promo_end: discount.promo_end,
    //   promo_description: discount.promo_description,
    // }

    const data = state
    const errorName = checkExistField(state.name)
    const errorPrice = checkExistField(state.price)
    const isNotValid = errorName || errorPrice

    if (isNotValid) {
      setErrorState({
        ...errorState,
        name: errorName,
        price: errorPrice,
      })
      return false
    }

    setLoading(true)
    onValidSubmit(data)
    console.log("FormMenuData onSubmit: ", data)

    // TODO: validation
    // const vName = validation.validate("general", name)
    // const vPrice = validation.validate("general", price)

    // const isValid = !vName && !vPrice

    // if (!isValid) {
    //   setError({
    //     name: vName,
    //     price: vPrice,
    //   })
    // } else {
    // console.log("FormMenuData onSubmit: ", data)
    // onValidSubmit(data)
    // }
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Input
          // ref={refName}
          // defaultValue={defaultVal.menu_name}
          style={styles.input}
          label="Nama"
          placeholder="Nama menu ..."
          warning={errorState.name}
          status={errorState.name ? "error" : "normal"}
          value={state.name}
          onChangeText={text => onInputChange(text, "name")}
        />

        <Input
          // ref={refPrice}
          // defaultValue={defaultVal?.menu_price?.toString()}
          style={styles.input}
          label="Harga"
          placeholder="Harga menu ..."
          keyboardType="number-pad"
          warning={errorState.price}
          status={errorState.price ? "error" : "normal"}
          value={state.price?.toString()}
          onChangeText={text => onInputChange(text, "price")}
        />

        <View style={styles.promoWrapper}>
          {discount && discount.promo_price && (
            <Input
              label="Harga Promo"
              placeholder="Harga promo menu ..."
              editable={false}
              value={discount.promo_price.toString()}
            />
          )}

          <View
            style={{
              ...styles.promoActions,
              marginTop: discount && discount.promo_price ? 10 : 0,
            }}>
            {discount && discount.promo_price && (
              <Button
                style={styles.promoItem}
                text="Hapus Promo"
                type="secondary"
                size="small"
                baseColor={Colors.themeDanger}
              />
            )}
            <Button
              style={{ ...styles.promoItem, ...styles.editPromo }}
              text={
                discount && discount.promo_price
                  ? "Ubah Promo"
                  : "Tambahkan Promo"
              }
              type="secondary"
              size="small"
              iconName={IconName.chevronRight}
              iconPosition="right"
              onPress={onClickPromo}
            />
          </View>
        </View>

        <Input
          // ref={refDescription}
          // defaultValue={defaultVal.menu_description}
          style={styles.input}
          label="Deskripsi (opsional)"
          placeholder="Deskripsi tentang menu ..."
          warning={errorState.description}
          status={errorState.description ? "error" : "normal"}
          value={state.description}
          onChangeText={text =>
            onInputChange(text, "description", checkOptional)
          }
        />

        <InputPhoto
          style={styles.input}
          labelText="Upload foto menu:"
          source={state.menuPict}
          onSelectPhoto={image =>
            onInputChange(image, "menuPict", checkOptional)
          }
        />

        <Button
          style={styles.submit}
          text="Simpan"
          size="large"
          isLoading={isLoading}
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

FormMenuData.propTypes = {
  onValidSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    menu_name: PropTypes.string,
    menu_price: PropTypes.number,
    menu_description: PropTypes.string,
    menu_pict: InputPhoto.propTypes.source,
    promo_price: PropTypes.number,
    promo_start: PropTypes.any,
    promo_end: PropTypes.any,
    promo_description: PropTypes.string,
  }),
  editPromoRouteName: PropTypes.string.isRequired,
}

FormMenuData.defaultProps = {
  onValidSubmit: () => {},
  data: {
    menu_name: null,
    menu_price: null,
    menu_description: null,
    menu_pict: null,
    promo_price: null,
    promo_start: null,
    promo_end: null,
    promo_description: null,
  },
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
  },
  input: {
    marginTop: 26,
  },
  promoWrapper: {
    marginTop: 26,
  },
  promoActions: {
    margin: -6,
    flexDirection: "row",
  },
  promoItem: {
    margin: 6,
  },
  editPromo: {
    flexGrow: 1,
    // width: Dimensions.get("window").width - Spaces.container * 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  submit: {
    marginTop: 40,
  },
})

export default FormMenuData
