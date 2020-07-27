import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"
import { Colors, FontFamily, Spaces } from "_styles"
import { Button } from "_atoms"
import DateTimePicker from "@react-native-community/datetimepicker"
import { CustomScheduleSelector } from "_molecules"

const RADIO_SIZE = 16
const RADIO_INNER_SIZE = 11
const RADIO_VALUES = {
  allTime: 0,
  closed: 1,
  custom: 2,
}

// Space between radio input and radio label
const RADIO_SPACE = 10

const PICKER_STATE = {
  close: 0,
  open_openTime: 1,
  open_closeTime: 2,
}

const EditSchedule = ({ navigation, route }) => {
  const radioOptions = [
    { label: "Buka 24 Jam", value: RADIO_VALUES.allTime },
    { label: "Tutup", value: RADIO_VALUES.closed },
    { label: "Kustom", value: RADIO_VALUES.custom },
  ]

  const _defaultPickerHour = 9
  const _defaultPickerMinute = 0
  const defaultPickerValue = new Date()
  defaultPickerValue.setHours(_defaultPickerHour, _defaultPickerMinute, 0)

  // Check passed value from route .params
  const isSchedule = route.params && route.params.defaultVal
  const defaultIsOpen = isSchedule ? route.params.defaultVal.isOpen : false
  const defaultOpen = isSchedule ? route.params.defaultVal.openResto : null
  const defaultClose = isSchedule ? route.params.defaultVal.closeResto : null

  // State
  const [selectedRadio, setSelectedRadio] = useState(
    defaultIsOpen ? RADIO_VALUES.custom : RADIO_VALUES.closed,
  )
  const [openTime, setOpenTime] = useState(defaultOpen)
  const [closeTime, setCloseTime] = useState(defaultClose)
  const [timePickerValue, setTimePickerValue] = useState(defaultPickerValue)

  /**
   * @type {boolean | string} you have to use string from PICKER_STATE
   */
  const [timePickerState, setTimePickerState] = useState(PICKER_STATE.close)

  const onSelectRadio = value => setSelectedRadio(value)

  /**
   * To get hh:mm format from a date
   *
   * @param {Date} date Javascript date format
   * @return {string}
   */
  const getHourMinuteFormat = date => {
    date = date
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5)
    return date
  }

  const onSelectTime = (event, selected) => {
    setTimePickerState(PICKER_STATE.close)

    // When canceled, somehow this will also be triggered
    if (!selected) return false

    const isForOpenTime = timePickerState === PICKER_STATE.open_openTime
    const hourMinuteFormat = getHourMinuteFormat(selected)

    if (isForOpenTime) {
      setOpenTime(hourMinuteFormat)
    } else {
      setCloseTime(hourMinuteFormat)
    }
  }

  /**
   * To handle opening TIme Picker component
   *
   * @param {any} pickerState state value from PICKER_STATE object
   * @param {string} value the initial value for Time Picker (hh:mm format)
   */
  const onOpenPicker = (pickerState, value = null) => {
    let newTimePickerValue = timePickerValue

    if (value) {
      const hour = parseInt(value.split(":")[0])
      const minute = parseInt(value.split(":")[1])

      newTimePickerValue = new Date()
      newTimePickerValue.setHours(hour, minute)
    }

    setTimePickerValue(newTimePickerValue)
    setTimePickerState(pickerState)
  }

  const onSubmit = () => {
    const isOnSubmit = route.params && route.params.onSubmit
    let data = {
      openResto: null,
      closeResto: null,
      isOpen: false,
    }

    if (selectedRadio === RADIO_VALUES.allTime) {
      data.openResto = "00:00"
      data.closeResto = "23:59"
      data.isOpen = true
    } else if (selectedRadio === RADIO_VALUES.closed) {
      data.openResto = "00:00"
      data.closeResto = "00:00"
      data.isOpen = false
    } else {
      data.openResto = openTime
      data.closeResto = closeTime
      data.isOpen = true
    }

    console.log(data)
    if (isOnSubmit) route.params.onSubmit(data)
  }

  return (
    <View style={styles.wrapper}>
      <RadioForm animation={true}>
        {radioOptions.map((val, i) => (
          <RadioButton key={i} labelHorizontal={true}>
            <RadioButtonInput
              obj={val}
              index={i}
              isSelected={selectedRadio === i}
              onPress={onSelectRadio}
              buttonWrapStyle={styles.radioButtonInput}
              borderWidth={1}
              buttonSize={RADIO_INNER_SIZE}
              buttonOuterSize={RADIO_SIZE}
              buttonInnerColor={Colors.brandPrimary}
              buttonOuterColor={
                selectedRadio === i ? Colors.brandPrimary : Colors.themeInactive
              }
            />
            <RadioButtonLabel
              obj={val}
              index={i}
              onPress={onSelectRadio}
              labelHorizontal={true}
              labelStyle={styles.radioButtonLabel}
            />
          </RadioButton>
        ))}
      </RadioForm>

      {/* Custom time configuration */}
      {selectedRadio === RADIO_VALUES.custom ? (
        <View style={styles.custom}>
          <CustomScheduleSelector
            style={styles.cutomScheduleSelector}
            label="Jam Buka"
            value={openTime}
            onPress={() => onOpenPicker(PICKER_STATE.open_openTime, openTime)}
          />
          <CustomScheduleSelector
            style={styles.cutomScheduleSelector}
            label="Jam Tutup"
            value={closeTime}
            onPress={() => onOpenPicker(PICKER_STATE.open_closeTime, closeTime)}
          />

          {timePickerState !== PICKER_STATE.close ? (
            <DateTimePicker
              value={timePickerValue}
              mode="time"
              is24Hour={true}
              onChange={onSelectTime}
            />
          ) : null}
        </View>
      ) : null}

      <Button
        style={styles.submit}
        size="large"
        text="Simpan"
        onPress={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
    paddingHorizontal: Spaces.container,
  },
  radioButtonInput: {
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 10,
  },
  radioButtonLabel: {
    paddingVertical: 10,
    marginRight: RADIO_SPACE,
    fontFamily: FontFamily.normal,
  },
  custom: {
    paddingLeft: RADIO_SIZE + RADIO_SPACE,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cutomScheduleSelector: {
    width: "44%",
  },
  submit: {
    marginTop: 30,
  },
})

export default EditSchedule
