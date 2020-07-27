import { auth } from "_actions"

const actionName = auth.actionName

// const initState = {
//   token: null,
//   userId: null,
//   username: null,
//   role: null,
//   hasSetup: false,
//   hasApproved: false,
// }

const initState = {
  mitraId: null,
  fullname: null,
  email: null,
  role: null,
  iat: null,
  token: null,
  hasSetup: false,
  hasApproved: false,
}

const authReducer = (state = initState, action) => {
  let newState

  switch (action.type) {
    case actionName.AUTH_LOGIN:
      newState = { ...state, ...action.params }
      console.log("authReducer: ", newState)

      return newState

    case actionName.AUTH_LOGOUT:
      newState = initState
      console.log("authReducer: ", newState)

      return newState

    case actionName.AUTH_HAS_SETUP:
      newState = { ...state, ...action.payload }
      console.log("authReducer: ", newState)

      return newState
    default:
      return state
  }
}

export default authReducer
