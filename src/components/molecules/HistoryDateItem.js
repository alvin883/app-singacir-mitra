import React from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Text, Button } from "_atoms"
import { Spaces, Colors, FontSizes } from "_styles"
import { convertToCurrency } from "_utils"

const HistoryDateItem = ({
  id,
  type,
  amount,
  status,
  time,
  withoutBorder,
  withCopy,
}) => {
  return (
    <View
      style={{
        ...styles.wrapper,
        borderBottomWidth: withoutBorder ? 0 : 1,
      }}>
      {type && status ? (
        <View style={styles.header}>
          <Text style={styles.type} size="small">
            {type}
          </Text>
          <Text style={styles.status} size="small">
            {status}
          </Text>
        </View>
      ) : null}

      <View style={styles.body}>
        <View style={styles.bodyLeft}>
          <Text style={styles.id} weight="bold">
            {id}
          </Text>

          {withCopy ? (
            <Button
              style={styles.idCopy}
              textStyle={styles.idCopyText}
              type="secondary"
              size="small"
              text="Copy"
            />
          ) : null}
        </View>
        <Text style={styles.amount} weight="bold">
          Rp {convertToCurrency(amount)}
        </Text>
      </View>
      <Text style={styles.time} size="small">
        {time}
      </Text>
    </View>
  )
}

HistoryDateItem.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.number,
  status: PropTypes.string,
  time: PropTypes.string,
  withoutBorder: PropTypes.bool,
  withCopy: PropTypes.bool,
}

HistoryDateItem.defaultProps = {
  withoutBorder: false,
  withCopy: true,
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
    borderBottomColor: Colors.themeBorder,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 4,
    color: Colors.themeLight,
    backgroundColor: Colors.brandSecondary,
  },
  status: {
    color: Colors.themeSuccess,
  },
  body: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  idCopy: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  idCopyText: {
    textTransform: "uppercase",
    fontSize: FontSizes.small,
  },
  amount: {},
  time: {
    marginTop: 6,
    opacity: 0.8,
  },
})

export default HistoryDateItem
