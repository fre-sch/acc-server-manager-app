import { writable } from "svelte/store"
import isNil from "lodash/isNil"
import { getCookie, setCookie } from "$lib/cookies.js"

export const loginToken = writable(
  getCookie("token")
)

export const openApiSchema = writable(null)


const updatesOnly = (fn) => {
  return (state) => {
    if (fn.init) fn(state)
    fn.init = true
  }
}

loginToken.subscribe(updatesOnly((value) => {
  if (isNil(value)) {
    setCookie("token", "", { samesite: "strict", "max-age": -1 })
  }
  else {
    setCookie("token", value, {
      samesite: "strict",
      "max-age": 24 * 60 * 60,
    })
  }
}))
