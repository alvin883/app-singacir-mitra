import axios from "axios"
import { role_api, roleName_api } from "../types/role"

const fetchRole = ({ mitraId }) => {
  return axios.get("mitras/showMitra", { params: { mitraId } })
}

const checkHasSetup = ({ fetchRoleResponse }) => {
  const mitraInfo = fetchRoleResponse.data.data
  const mitraRole = mitraInfo.Business.id
  const mitraRoleName = roleName_api[mitraRole]
  const mitraHasSetup = mitraInfo[mitraRoleName]?.id ? true : false
  return mitraHasSetup
}

export default { fetchRole, checkHasSetup }
