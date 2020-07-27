import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, InputLabel, Divider, Text, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { hexToRgb, navigationServices } from "_utils"
import { WorkHourItem } from "_molecules"

const DAY_NAME = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
  "Minggu",
]

const SCHEDULE_SAMPLE = [
  {
    open: "10:45",
    close: "21:00",
  },
  {
    open: "11:45",
    close: "22:00",
  },
  {
    open: "12:45",
    close: "23:00",
  },
  {
    open: "09:45",
    close: "20:00",
  },
  {
    open: "10:45",
    close: "21:00",
  },
  {
    open: "08:45",
    close: "19:00",
  },
  {
    open: "07:45",
    close: "18:00",
  },
]

const StepWorkHour = ({ onValidSubmit }) => {
  const [schedule, setSchedule] = useState(SCHEDULE_SAMPLE)

  const onSubmitScheduleItem = (index, data) => {
    navigationServices.GoBack()

    let _schedule = [...schedule]
    _schedule[index] = data

    setSchedule(_schedule)
  }

  return (
    <View>
      <Heading style={styles.heading} text="Jam Operasional" size="3" />

      {DAY_NAME.map((name, i) => {
        return (
          <React.Fragment key={i}>
            {/* {i !== 0 && <Divider style={styles.divider} />} */}
            <WorkHourItem
              label={name}
              openHour={schedule[i].open}
              closeHour={schedule[i].close}
              onPress={() =>
                navigationServices.Navigate("warung/setup/edit-jadwal", {
                  defaultVal: schedule[i],
                  onSubmit: data => onSubmitScheduleItem(i, data),
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
        text="Selanjutnya"
        onPress={() => onValidSubmit(schedule)}
      />
    </View>
  )
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

export default StepWorkHour
