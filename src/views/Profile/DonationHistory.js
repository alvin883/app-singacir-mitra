import React, { useState, useEffect, Component } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Text, Button } from "_atoms"
import { Spaces, Colors } from "_styles"
import { HistoryDateItem } from "_molecules"
import { IconName } from "_c_a_icons"

const sample = [
  {
    date: "12 Desember 2019",
    items: [
      {
        id: "#9d7baa94",
        amount: 10000,
        time: "15:30",
      },
      {
        id: "#9d7baa94",
        amount: 2000,
        time: "15:30",
      },
    ],
  },
  {
    date: "26 April 2019",
    items: [
      {
        id: "#9d7baa94",
        amount: 3000,
        time: "15:30",
      },
      {
        id: "#9d7baa94",
        amount: 4500,
        time: "15:30",
      },
    ],
  },
]

/**
 * SET_API Set the name of attribute of history list here
 * TODO: Move this to component, but before that please think about how the
 * attribute naming convention
 */
const DateGroup = ({ date, items }) => {
  return (
    <View style={DateStyles.wrapper}>
      <View style={DateStyles.date}>
        <Text style={DateStyles.dateText} weight="bold">
          {date}
        </Text>
      </View>

      {items.map((val, index) => (
        <HistoryDateItem
          key={index}
          id={val.id}
          amount={val.amount}
          time={val.time}
          withCopy={false}
        />
      ))}
    </View>
  )
}

DateGroup.propTypes = {
  date: PropTypes.string,
  items: PropTypes.array,
  // items: PropTypes.arrayOf(PropTypes.shape(DateItem.propTypes)),
}

const DateStyles = StyleSheet.create({
  wrapper: {},
  date: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
    borderBottomColor: Colors.themeBorder,
    borderBottomWidth: 1,
    backgroundColor: Colors.themeLight,
  },
  dateText: {
    opacity: 0.8,
    textAlign: "center",
  },
})

const Pagination = ({ current, total, onNext, onPrev }) => {
  const isMax = current === total
  const isMin = current === 1

  return (
    <View style={PaginationStyles.wrapper}>
      <Button
        style={PaginationStyles.button}
        iconName={IconName.arrowLeftLong}
        type="secondary"
        iconStyle={{ marginRight: 0 }}
        state={isMin ? "disabled" : "default"}
        onPress={onPrev}
      />
      <Text style={PaginationStyles.info}>
        {current} / {total}
      </Text>
      <Button
        style={PaginationStyles.button}
        iconName={IconName.arrowRightLong}
        type="primary"
        iconStyle={{ marginRight: 0 }}
        state={isMax ? "disabled" : "default"}
        onPress={onNext}
      />
    </View>
  )
}

const PaginationStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    minWidth: 100,
    paddingHorizontal: 20,
    flexGrow: 0,
    flexShrink: 0,
    textAlign: "center",
  },
  button: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

class DonationHistory extends Component {
  _isMounted = false

  state = {
    data: [],
    isLoading: true,
    current_page: 1,
    total_page: 1,
  }

  componentDidMount() {
    this._isMounted = true
    this.getData(1)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getData = page => {
    // TODO: Change this, this is just for imitating API response time
    setTimeout(() => {
      if (this._isMounted) {
        // TODO: Change this, this is just sample
        this.setState({
          data: sample,
          current_page: page,
          total_page: 10,
          isLoading: false,
        })
      }
    }, 1000)
  }

  onPrev = () => {
    const page = this.state.current_page - 1

    if (this.state.isLoading) return false

    this.setState({ isLoading: true })
    this.getData(page)
  }

  onNext = () => {
    const page = this.state.current_page + 1

    if (this.state.isLoading) return false

    this.setState({ isLoading: true })
    this.getData(page)
  }

  render() {
    return (
      <ScrollView>
        {sample.map((val, index) => (
          <DateGroup key={index} date={val.date} items={val.items} />
        ))}

        <Pagination
          current={this.state.current_page}
          total={this.state.total_page}
          onPrev={this.onPrev}
          onNext={this.onNext}
        />
      </ScrollView>
    )
  }
}

export default DonationHistory

/* 
const BalanceHistory = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    current_page: 1,
    total_page: 1
  })

  const getData = () => {
    const page = state.current_page +1

    // TODO: Change this, this is just for imitating API response time
    setTimeout(() => {

      // TODO: Change this, this is just sample
      setState({
        ...state,
        data: sample,
        current_page: page,
        total_page: 10
      })
    }, 2000);
  }


  const onNextPage = ()=>{

  }
  
  useEffect(() => {
    getData()
    return () => {
      cleanup
    }
  }, [input])

  return (
    <ScrollView>
      {sample.map((val, index) => (
        <DateGroup key={index} date={val.date} items={val.items} />
      ))}

      <Pagination current={1} total={3} />
    </ScrollView>
  )
}

export default BalanceHistory
 */
