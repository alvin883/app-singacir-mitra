const functionWithParams = totalParameter => {
  return function(props, propName, componentName) {
    const prop = props[propName]
    const hasPrototype = prop.prototype
    const isFunction = typeof prop.prototype.constructor === "function"
    const isValid = prop.prototype.constructor.length === totalParameter

    if (!hasPrototype || !isFunction || !isValid) {
      return new Error(
        `${componentName} -> ${propName} must be a function with ${totalParameter} arguments`,
      )
    }
  }
}

export default functionWithParams
