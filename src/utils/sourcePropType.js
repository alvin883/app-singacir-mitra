// TODO: Delete this file when everything has migrated to
// `customPropTypes.imageSource`
import PropTypes from "prop-types"

/**
 * Please don't use this anymore
 * @deprecated use `customPropTypes.imageSource` instead
 */
const sourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string,
    headers: PropTypes.objectOf(PropTypes.string),
  }),
  PropTypes.number,
  PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
  ),
])

export default sourcePropType
