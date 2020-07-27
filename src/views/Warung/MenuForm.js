import React, { useRef, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { FormMenuData, LoadingView } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"
import { asyncHandle, navigationServices } from "_utils"
import { Alert } from "react-native"

const MenuForm = ({ navigation, route }) => {
  const mitraId = useSelector(state => state.authReducer.mitraId)
  // const [warungId, setWarungId] = useState()
  const [isFetching, setFetching] = useState(false)
  const warungId = route.params.warungId
  const warungCategoryId = route.params.warungCategoryId

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(`${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`)
    setFetching(false)
    navigationServices.GoBack()
    return false
  }

  // const fetchWarungId = async () => {
  //   let apiPromise, apiRes, apiErr

  //   // Get warungId
  //   apiPromise = axios.get("mitras/showMitra", { params: { mitraId: mitraId } })
  //   ;[apiRes, apiErr] = await asyncHandle(apiPromise)
  //   if (apiErr) return errorHandler(apiErr, "showMitraErr", "mitra-1")
  //   const warungId = apiRes.data.data.Warung.id

  //   setWarungId(warungId)
  //   setFetching(false)
  // }

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchWarungId()
  //   }, []),
  // )

  const onSubmit = async data => {
    let apiData, apiParams, apiPromise, apiRes, apiErr
    let uploadedImageURL

    if (data.menuPict) {
      apiData = new FormData()
      apiData.append("image", {
        uri: data.menuPict.uri,
        name: "warungMenuPhoto.jpg",
        type: "image/jpeg",
      })
      apiPromise = axios.post("uploadimage/warungmenu", apiData)
      ;[apiRes, apiErr] = await asyncHandle(apiPromise)
      if (apiErr) return errorHandler(apiErr, "uploadImageErr")
      uploadedImageURL = apiRes.data.image_url
    }

    console.log({ uploadedImageURL, warungCategoryId })

    // Get warungId
    apiParams = { params: { mitraId: mitraId } }
    apiData = {
      name: data.name,
      price: data.price,
      description: data.description,
      promoPrice: data.promoPrice,
      promoStart: data.promoStart,
      promoEnd: data.promoEnd,
      promoDescription: data.promoDescription,
      warungId: warungId,
      menuPict: uploadedImageURL,
      warungCategoryId: warungCategoryId,
    }
    apiPromise = axios.post("warungmenu/add", apiData, apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "addMenuErr", "add-1")

    console.log("apiRes", apiRes.data)
    Alert.alert("Sukses", "Menu berhasil ditambahkan", [
      {
        text: "Oke",
        onPress: navigationServices.GoBack(),
      },
    ])
  }

  if (isFetching) return <LoadingView />

  return (
    <FormMenuData
      data={route.params?.data}
      // onValidSubmit={route.params?.onValidSubmit}
      onValidSubmit={onSubmit}
      editPromoRouteName="warung/dashboard/edit-promo"
    />
  )
}

export default MenuForm

// import { View, ScrollView, StyleSheet, Dimensions } from "react-native"
// import { Input, Button, InputPhoto } from "_atoms"
// import { IconName } from "_c_a_icons"
// import { Spaces } from "_styles"
// import { customPropTypes } from "_utils"

// const MenuForm = ({ onValidSubmit, data: defaultVal }) => {
//   const refName = useRef()
//   const refPrice = useRef()
//   const refDescription = useRef()

//   // const initPhoto = defaultVal?.photo
//   const initPhoto = defaultVal.photo ? defaultVal.photo : null
//   const [photo, setPhoto] = useState(initPhoto)

//   const onClickPromo = () => {}

//   const onSelectPhoto = image => {
//     setPhoto(image)
//   }

//   const onSubmit = () => {
//     const name = refName.current.state.text
//     const price = refPrice.current.state.text
//     const description = refDescription.current.state.text

//     const data = {
//       name,
//       price,
//       description,
//       photo,
//     }

//     // TODO: validation

//     console.log("MenuForm onSubmit: ", data)
//     onValidSubmit(data)
//   }

//   return (
//     <ScrollView>
//       <View style={styles.wrapper}>
//         <Input
//           ref={refName}
//           style={styles.input}
//           label="Nama"
//           placeholder="Nama menu ..."
//           defaultValue={defaultVal.name}
//         />

//         <Input
//           ref={refPrice}
//           style={styles.input}
//           label="Harga"
//           placeholder="Harga menu ..."
//           defaultValue={defaultVal.price}
//         />

//         <Button
//           style={styles.promo}
//           text="Tambahkan Promo"
//           type="secondary"
//           size="small"
//           iconName={IconName.chevronRight}
//           iconPosition="right"
//           onPress={onClickPromo}
//         />

//         <Input
//           ref={refDescription}
//           style={styles.input}
//           label="Deskripsi (opsional)"
//           placeholder="Deskripsi tentang menu ..."
//           defaultValue={defaultVal.description}
//         />

//         <InputPhoto
//           style={styles.input}
//           labelText="Upload foto menu:"
//           source={photo}
//           onSelectPhoto={onSelectPhoto}
//         />

//         <Button
//           style={styles.submit}
//           text="Simpan"
//           size="large"
//           onPress={onSubmit}
//         />
//       </View>
//     </ScrollView>
//   )
// }

// MenuForm.propTypes = {
//   onValidSubmit: PropTypes.func.isRequired,
//   data: PropTypes.shape({
//     name: PropTypes.string,
//     price: PropTypes.number,
//     description: PropTypes.string,
//     photo: customPropTypes.imageSource,
//   }),
// }

// MenuForm.defaultProps = {
//   onValidSubmit: () => {},
//   data: {
//     name: null,
//     price: null,
//     description: null,
//     photo: null,
//   },
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     paddingVertical: 20,
//     paddingHorizontal: Spaces.container,
//   },
//   input: {
//     marginTop: 26,
//   },
//   promo: {
//     width: Dimensions.get("window").width - Spaces.container * 2,
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 26,
//   },
//   submit: {
//     marginTop: 40,
//   },
// })

// export default MenuForm
