import PropTypes from "prop-types"
import React, { Component } from "react"
import { PermissionsAndroid, StyleSheet, Text, Linking } from "react-native"
import ImagePicker from "react-native-image-picker"
import {
  Button,
  Input,
  InputPhoto,
  InputSelect,
  Checkbox,
  Content,
  Heading,
} from "_atoms"
import { FontSizes, Colors } from "_styles"

class Second extends Component {
  static propTypes = {
    onNext: PropTypes.func,
  }

  static defaultProps = {
    onNext: () => {},
  }

  state = {
    valueType: null,
    indexType: null,
    optionsType: [
      { label: "Motoris", value: "motoris" },
      { label: "Resto", value: "resto" },
      { label: "Warung", value: "warung" },
      { label: "Pedagang Keliling", value: "pedagang" },
    ],
    checkbox: false,
  }

  onSelect = (val, index) => {
    this.setState({
      valueType: val,
      // Somehow it will give you `realIndex + 1`
      // version <=6.6.0
      indexType: index - 1,
    })
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({ checkbox: !prevState.checkbox }))
  }

  clickNext = () => {
    this.props.onNext()
  }

  render() {
    const { valueType, indexType, optionsType, checkbox } = this.state

    return (
      <>
        <Heading text="Data Usaha" size="3" style={styles.heading} />

        <Input
          style={{ ...styles.input, marginTop: 20 }}
          label="Nama Usaha"
          placeholder="Nama usaha anda ..."
        />

        <InputSelect
          onSelect={this.onSelect}
          style={styles.input}
          value={valueType}
          label="Jenis Usaha"
          placeholder="Pilih jenis usaha anda"
          options={optionsType}
        />

        <Checkbox
          style={styles.terms}
          onPress={this.toggleCheckbox}
          checked={checkbox}
          clickableChildren={false}>
          <Content>
            Saya telah membaca dan setuju dengan{"\n"}
            <Text
              style={styles.termsLink}
              onPress={() => {
                Linking.openURL("http://www.example.com/")
              }}>
              Syarat dan Ketentuan
            </Text>{" "}
            yang berlaku
          </Content>
        </Checkbox>

        <Button
          style={styles.button}
          text="Selanjutnya"
          type="primary"
          size="large"
          onPress={this.clickNext}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: FontSizes.normal,
    marginTop: 40,
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  terms: {
    marginTop: 20,
  },
  photo: {
    marginTop: 26,
  },
  termsLink: {
    color: Colors.brandPrimary,
  },
})

export default Second
