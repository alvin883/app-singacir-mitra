import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import { FormMenuData } from "_organisms"

const MenuForm = ({ navigation, route }) => {
  return (
    <FormMenuData
      data={route.params?.data}
      onValidSubmit={route.params?.onValidSubmit}
      editPromoRouteName="resto/dashboard/edit-promo"
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
