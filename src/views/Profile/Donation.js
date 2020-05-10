import React from "react"
import {
  ScrollView,
  View,
  StyleSheet,
  ColorPropType,
  ViewPropTypes,
} from "react-native"
import PropTypes from "prop-types"
import { Text, Content, Input, Button } from "_atoms"
import { FontSizes, Spaces, Colors } from "_styles"
import { convertToCurrency, hexToRgb, navigationServices } from "_utils"

const Bigbutton = ({ title, value, baseColor, style }) => {
  return (
    <View style={{ ...BigbuttonStyles.wrapper, ...style }}>
      <Text style={{ color: baseColor }} size="small">
        {title}
      </Text>
      <Text style={{ color: baseColor }} size="extraLarge" weight="bold">
        {value}
      </Text>
    </View>
  )
}

Bigbutton.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  baseColor: ColorPropType,
  style: ViewPropTypes.style,
}

Bigbutton.defaultProps = {
  baseColor: Colors.brandPrimary,
}

const BigbuttonStyles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  value: {
    marginTop: 4,
    fontSize: FontSizes.extraLarge,
  },
})

const sample = {
  singacir_donation: 12500000,
  your_donation: 50000,
  points: 750,
}

const Donation = props => {
  const data = sample

  const onSubmit = () => {
    // alert("Submit")
    // props
    navigationServices.Navigate("profile/success-donation", {
      title: "Donasi Berhasil",
    })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Bigbutton
          style={{
            ...styles.bigbutton,
            ...{
              marginTop: 0,
              backgroundColor: hexToRgb(Colors.brandSecondary, 0.06),
            },
          }}
          baseColor={Colors.brandSecondary}
          title="Total Donasi Saat Ini"
          value={"Rp " + convertToCurrency(data.singacir_donation)}
        />
        <Bigbutton
          style={styles.bigbutton}
          title="Total Donasi Anda"
          value={"Rp " + convertToCurrency(data.your_donation)}
        />
        <Content>
          Ayo donasikan setiap satu poin anda dengan nilai sebesar Rp 1 yang
          akan diberikan untuk mereka yang membutuhkan.
        </Content>
        <Bigbutton
          style={styles.bigbutton}
          title="Sisa Point Anda"
          value={convertToCurrency(data.points)}
        />
        <Input
          style={styles.input}
          label="Jumlah Points"
          placeholder="Jumlah poin yang akan di tukar ..."
        />

        <Button
          style={styles.submit}
          text="Donasikan"
          size="large"
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: Spaces.container,
  },
  bigbutton: {},
  input: {
    marginTop: 14,
  },
  submit: {
    marginTop: 40,
  },
})

export default Donation
