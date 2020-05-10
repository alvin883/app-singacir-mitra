import validation from "validate.js"
import validationRules from "./validationRules"

/**
 * To perform validation with validate.js library
 *
 * @param {string} fieldType The field you want to validate with,
 * see `validation/validationRules.js` for possible options
 * @param {*} value The value that you want to validate
 */
export default function validate(fieldType, value) {
  /**
   * You have to convert this as an object, because validate.js validate values
   *  as an object
   */
  let formValue = {}
  formValue[fieldType] = value

  /**
   * Get the validation rule that we want to test with, it's also should be
   * pass as an object
   */
  let constraint = {}
  constraint[fieldType] = validationRules[fieldType]

  /**
   * Validate the value with the given rule, and if success it will return null
   * if it error, it will return an object
   */
  const result = validation(formValue, constraint)

  /**
   * Error
   *
   * return the first error message in the array
   * example result:
   * {
   *    password: ["You have to fill this", "You have to fit minimum length"]
   * }
   */
  if (result) return result[fieldType][0]

  /**
   * Success
   */
  return null
}
