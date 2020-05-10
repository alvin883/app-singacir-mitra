import { PermissionsAndroid } from "react-native"

const appconfig = {
  displayName: "Singacir",
}

const _camera = async function() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: `${appconfig.displayName} Camera Permission`,
        message: `${appconfig.displayName} needs access to your camera so you can take awesome pictures.`,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise.resolve(true)
    } else {
      return new Promise.reject({ error: false, denied: true })
    }
  } catch (err) {
    return new Promise.reject({ error: err })
  }
}

const _files = async function() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: `${appconfig.displayName} Camera Permission`,
        message: `${appconfig.displayName} needs access to your camera so you can take awesome pictures.`,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise.resolve(true)
    } else {
      return new Promise.reject({ error: false, denied: true })
    }
  } catch (err) {
    return new Promise.reject({ error: err })
  }
}

export const camera = _camera
export const files = _files
