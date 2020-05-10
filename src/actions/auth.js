const actionName = {
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  AUTH_HAS_SETUP: "AUTH_HAS_SETUP",
}

const login = params => {
  return {
    type: actionName.AUTH_LOGIN,
    params: params,
  }
}

const logout = params => {
  console.log("authActions - logout")

  return {
    type: actionName.AUTH_LOGOUT,
    params: params,
  }
}

/**
 * Set hasSetup value
 * @param {boolean} value
 */
const setSetup = value => {
  return {
    type: actionName.AUTH_HAS_SETUP,
    payload: {
      hasSetup: value,
    },
  }
}

export { actionName, login, logout, setSetup }
