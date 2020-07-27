import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, InputLabel, Divider, Text, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { hexToRgb, navigationServices } from "_utils"
import { WorkHourItem } from "_molecules"

// DAYS id follow JavaScript day array [0 = sunday; 6 = saturday]
const DAYS = [
  {
    id: 1,
    name: "Senin",
  },
  {
    id: 2,
    name: "Selasa",
  },
  {
    id: 3,
    name: "Rabu",
  },
  {
    id: 4,
    name: "Kamis",
  },
  {
    id: 5,
    name: "Jum'at",
  },
  {
    id: 6,
    name: "Sabtu",
  },
  {
    id: 0,
    name: "Minggu",
  },
]

const SCHEDULE_SAMPLE = [
  {
    day: DAYS[0].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[1].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[2].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[3].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[4].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[5].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
  {
    day: DAYS[6].id,
    openResto: "00:00",
    closeResto: "00:00",
    isOpen: false,
  },
]

const FormWorkHour = ({
  onValidSubmit,
  isFirstSetup,
  editRouteName,
  data,
  isLoading: propIsLoading,
}) => {
  const [schedule, setSchedule] = useState(data || SCHEDULE_SAMPLE)

  const onSubmitScheduleItem = (index, data, dayId) => {
    let _schedule = [...schedule]
    _schedule[index] = { ...data, day: dayId }
    navigationServices.GoBack()
    setSchedule(_schedule)
    console.log("onSubmitScheduleItem", _schedule)
  }

  const onSubmit = () => {
    console.log("onSubmit", schedule)
    onValidSubmit(schedule)
  }

  return (
    <View>
      {isFirstSetup && (
        <Heading style={styles.heading} text="Jam Operasional" size="3" />
      )}

      {DAYS.map(({ name, id }, i) => {
        return (
          <React.Fragment key={i}>
            {/* {i !== 0 && <Divider style={styles.divider} />} */}
            <WorkHourItem
              label={name}
              openHour={schedule[i]?.openResto || SCHEDULE_SAMPLE[i].openResto}
              closeHour={
                schedule[i]?.closeResto || SCHEDULE_SAMPLE[i].closeResto
              }
              isOpen={schedule[i].isOpen}
              onPress={() =>
                navigationServices.Navigate(editRouteName, {
                  dayName: name,
                  defaultVal: schedule[i].openResto
                    ? schedule[i]
                    : SCHEDULE_SAMPLE[i],
                  onSubmit: data => onSubmitScheduleItem(i, data, id),
                })
              }
            />
            <Divider style={styles.divider} />
          </React.Fragment>
        )
      })}

      <Button
        style={styles.submit}
        size="large"
        state={propIsLoading ? "loading" : "default"}
        text={isFirstSetup ? "Selanjutnya" : "Simpan"}
        onPress={onSubmit}
      />
    </View>
  )
}

FormWorkHour.propTypes = {
  onValidSubmit: PropTypes.func.isRequired,
  isFirstSetup: PropTypes.bool,

  /**
   * Route name destination when user edit certain WorkHour
   */
  editRouteName: PropTypes.string.isRequired,
}

FormWorkHour.defaultProps = {
  onValidSubmit: data => {},
  isFirstSetup: true,
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
  submit: {
    marginTop: 30,
  },
})

export default FormWorkHour
