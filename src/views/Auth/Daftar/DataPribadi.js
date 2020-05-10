import PropTypes from "prop-types"
import React, { Component } from "react"
import { FormOwnerData } from "_organisms"

/**
 * @augments {Component<First.propTypes, {}>}
 */
class DataPribadi extends Component {
  static propTypes = {
    onNext: PropTypes.func,
  }

  static defaultProps = {
    onNext: () => {},
  }

  clickNext = () => {
    this.props.onNext()
    console.log("click next")
  }

  render() {
    return <FormOwnerData onValidSubmit={this.clickNext} />
  }
}

export default DataPribadi
