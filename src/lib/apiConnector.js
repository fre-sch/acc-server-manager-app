import axios from "axios"
import constants from "$lib/constants.js"

export default axios.create({
  baseURL: constants.API_BASE
})
