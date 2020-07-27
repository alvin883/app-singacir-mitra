import React, { useCallback } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { color } from "react-native-reanimated"
import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import { useSelector } from "react-redux"
import { asyncHandle, navigationServices } from "_utils"
import { LoadingView } from "_organisms"

const CategoryList = ({ route, navigation }) => {
  const [isFetching, setFetching] = useState(true)
  const [categories, setCategories] = useState([])
  const mitraId = useSelector(state => state.authReducer.mitraId)
  const warungId = route.params.warungId

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

  const fetchingCategory = async () => {
    let apiParams, apiPromise, apiRes, apiErr
    setFetching(true)

    apiParams = {
      params: {
        mitraId: mitraId,
        warungId: warungId,
      },
    }
    apiPromise = axios.get("warungcategories/categories", apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "fetchingCategoryErr", "fetch-1")
    const categories = apiRes.data.data
    setCategories(categories)
    setFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchingCategory()
    }, []),
  )

  const onEdit = (warungMenus, warungCategoryId) => {
    navigationServices.Navigate("warung/dashboard/menu", {
      menus: warungMenus,
      warungCategoryId: warungCategoryId,
    })
  }

  if (isFetching) return <LoadingView />

  return (
    <View style={styles.wrapper}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.CategoryList}>
          {categories.length ? (
            categories.map((val, index) => (
              <CategoryItem
                key={index}
                title={val.name}
                amount={val.WarungMenus.length}
                onEdit={() => onEdit(val.WarungMenus, val.id)}
              />
            ))
          ) : (
            <Text>Belum ada kategori di dalam warung anda</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          size="large"
          text="Tambah Kategori"
          onPress={() =>
            navigationServices.Navigate("warung/dashboard/category/add")
          }
        />
      </View>
    </View>
  )
}

const CategoryItem = ({ title, amount, onEdit }) => {
  return (
    <View style={styles.CategoryItem}>
      <View style={styles.CategoryItemContent}>
        <Text weight="bold">{title}</Text>
        <Text size="small"> {amount} item</Text>
      </View>
      <View>
        <Button type="secondary" text="Ubah" onPress={onEdit} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  bottom: {
    paddingHorizontal: Spaces.container,
    paddingVertical: 16,
    borderTopColor: Colors.themeBorder,
    borderTopWidth: 1,
    backgroundColor: Colors.themeLight,
  },
  CategoryList: {
    paddingVertical: 14,
  },
  CategoryItem: {
    paddingVertical: 18,
    paddingHorizontal: Spaces.container,
    flexDirection: "row",
    borderBottomColor: Colors.themeBorder,
    borderBottomWidth: 1,
  },
  CategoryItemContent: {
    flexGrow: 1,
  },
})

export default CategoryList
