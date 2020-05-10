import React, { useState } from "react"
import { Loading } from "_views"
import SetupStack from "./SetupStack"
import DashboardStack from "./DashboardStack"

const Switch = ({ hasSetup }) => {
  return hasSetup ? <DashboardStack /> : <SetupStack />
}

export default Switch
