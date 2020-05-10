import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { InputLabel, Button, Text, Divider } from "_atoms"
import { StyleSheet, View, ScrollView } from "react-native"
import { Spaces } from "_styles"
import { navigationServices } from "_utils"
import { IconName } from "_c_a_icons"
import { LoadingView } from "_organisms"

const AlamatItem = ({ data, onPress }) => {
  return (
    <>
      <View style={styles.item}>
        <InputLabel text="Alamat Pedagang" />
        <Text style={styles.itemAddress}>{data.address}</Text>
        <Button
          style={styles.itemButton}
          text="Ubah"
          type="secondary"
          onPress={onPress}
        />
      </View>
      <Divider />
    </>
  )
}

const Alamat = () => {
  const [isFetching, setFetching] = useState(true)
  const [addressList, setAddressList] = useState([])

  const onEditLocation = (value, i) => {
    navigationServices.Navigate("pedagang/dashboard/edit-alamat", {
      FormAddressData: {
        data: value,
        onValidSubmit: data => {
          const newAddressList = [...addressList]

          newAddressList[i] = data

          setAddressList(newAddressList)
          navigationServices.GoBack()
          console.log("Alamat - onValidSubmit: ", data)
        },
      },
    })
  }

  const onAddNewLocation = () => {
    navigationServices.Navigate("pedagang/dashboard/edit-alamat", {
      FormAddressData: {
        onValidSubmit: data => {
          const newAddressList = [...addressList, data]

          setAddressList(newAddressList)
          navigationServices.GoBack()
          console.log("Alamat - onValidSubmit: ", data)
        },
      },
    })
  }

  useEffect(() => {
    let isMounted = true

    setTimeout(() => {
      if (isMounted) {
        setAddressList([
          {
            address: "Jl. Gatot Subroto, Jakarta",
            kelurahan: "Kelurahan A",
            kecamatan: "Kecamatan B",
            postCode: "55281",
            coordinate: {
              latitude: -7.76645953,
              longitude: 110.40190905,
            },
          },
          {
            address: "Jl. Ahmad Yani, Bekasi",
            kelurahan: "Kelurahan X",
            kecamatan: "Kecamatan Y",
            postCode: "12345",
            coordinate: {
              latitude: -7.76947856,
              longitude: 110.40522963,
            },
          },
        ])
        setFetching(false)
      }
    }, 775)

    return () => {
      isMounted = false
    }
  }, [])

  return isFetching ? (
    <LoadingView />
  ) : (
    <ScrollView>
      <View style={styles.wrapper}>
        {addressList.map((value, i) => (
          <AlamatItem
            key={i}
            data={value}
            onPress={onEditLocation.bind(null, value, i)}
          />
        ))}

        <Button text="Tambah Lokasi" size="large" onPress={onAddNewLocation} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spaces.container,
    marginVertical: 40,
  },
  item: {},
  itemAddress: {
    marginTop: 8,
  },
  itemButton: {
    marginTop: 14,
  },
})

export default Alamat
