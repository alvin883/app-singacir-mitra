import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Input, Button } from "_atoms"
import { useState } from "react"
import { objectMap, validation, asyncHandle, navigationServices } from "_utils"
import { Spaces } from "_styles"
import axios from "axios"
import { useSelector } from "react-redux"

const CategoryAdd = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({ name: null })
  const [errorState, setErrorState] = useState(objectMap(state, val => null))
  const mitraId = useSelector(state => state.authReducer.mitraId)
  const warungId = route.params.warungId

  const checkExistField = str => {
    return validation.validate("general", str)
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

  const errorHandler = (
    err,
    titleLog = "Steps Error",
    errorCodeLog = "",
    message = "Terjadi kesalahan, silahkan coba beberapa saat lagi",
  ) => {
    console.log(titleLog, err)
    console.log(titleLog, err?.response?.data)
    alert(`${message}${errorCodeLog ? `\n\ncodeError: ${errorCodeLog}` : ``}`)
    setLoading(false)
    navigationServices.GoBack()
    return false
  }

  const onSubmit = async () => {
    const errorName = checkExistField(state.name)
    if (errorName) {
      setState({ ...errorState, name: errorName })
      return false
    }

    setLoading(true)
    let apiParams, apiData, apiPromise, apiRes, apiErr

    apiData = { name: state.name, warungId: warungId }
    apiParams = { params: { mitraId: mitraId } }
    apiPromise = axios.post("warungcategories/add", apiData, apiParams)
    ;[apiRes, apiErr] = await asyncHandle(apiPromise)
    if (apiErr) return errorHandler(apiErr, "warungCategoryErr", "catErr-1")

    setLoading(false)
    navigationServices.GoBack()
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Input
          style={styles.input}
          label="Nama kategori"
          placeholder="Nama kategori ..."
          warning={errorState.name}
          status={errorState.name ? "error" : "normal"}
          value={state.name}
          onChangeText={text => onInputChange(text, "name")}
        />
        <Button
          text="Tambah"
          size="large"
          style={styles.submit}
          onPress={onSubmit}
          state={isLoading ? "loading" : "default"}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
  },
  input: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

export default CategoryAdd
