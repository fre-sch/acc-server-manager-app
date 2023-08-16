import isNil from "lodash/isNil"
import isEmpty from "lodash/isEmpty"
import JsonPointer from "json-pointer"

export const dispatchEvent = (element, eventName, eventDetails) => {
  element.dispatchEvent(new CustomEvent(eventName, {
    detail: eventDetails,
    bubbles: true,
    cancelable: true
  }))
}


export const prefix = (prefix_, value) => (value ? `${prefix_}${value}` : value)


class xURLSearchParams extends URLSearchParams {
  toString() {
    return prefix("?", super.toString())
  }
}

export const usvEncode = (params) =>
  Object.keys(isNil(params) ? {} : params).reduce((usv, key) => {
    usv.append(key, params[key])
    return usv
  }, new xURLSearchParams())


export const trimEnd = (val, chars = "\n\t\r ") => {
  const regex = new RegExp(`[${chars}]+$`)
  return val.replace(regex, "")
}


export const trimStart = (val, chars = "\n\t\r ") => {
  const regex = new RegExp(`^[${chars}]+`)
  return val.replace(regex, "")
}


export const trim = (val, chars = "\n\t\r ") =>
  trimStart(trimEnd(val, chars), chars)


export const urlJoin = (base, ...values) => (
  trimEnd(base, "/") + "/" + trimStart(
    values.join("/").replace(/\/+/g, "/"),
    "/")
)


/**
 * Take object with keys being column names and values being "asc" or "desc"
 * and create a string where keys and values are separated by ":" with each
 * key/value pair separated by ";".
 *
 * Example:
 *
 *   sortableToQuery({"name": "asc", "age": "desc"}) => [
 *     ["name", "asc"],
 *     ["age", "desc"],
 *   ]
 */
export const sortableToQuery = (value) =>
  Object.keys(value)
    .filter((key) => value[key] !== null)
    .map((key) => [key, value[key] ? "asc" : "desc"])


/**
 * Take object with names and values and create a string where keys and values
 * are separated by ":" with each key/value pair separated by ";".
 *
 * Example:
 *
 *   filterableToQuery({"name": "Albert", "age": "25"}) => [
 *     ["name", "==", "Albert"],
 *     ["age", "==", 25]
 *   ]
 */
export const filterableToQuery = (value) =>
  Object.keys(value)
    .filter((key) => !isEmpty(value[key]))
    .map((key) => [key, "contains", value[key]])


/**
 * Take optional string and return with postfix appended if not empty.
 */
export const postfix = (str, postfix) => (str ? `${str}${postfix}` : "")

/**
 * Take seconds and return in format "(days)d (hours)h (minutes)m (seconds)s"
 *
 * Example:
 *  formatDuration(3600) => "1h 0m 0s"
 */
export const formatDuration = (value) => {
  const days = Math.floor(value / (3600 * 24))
  const hours = Math.floor((value % (3600 * 24)) / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = Math.floor(value % 60)

  return `${postfix(days, "d ")}${postfix(hours, "h ")}${postfix(minutes, "m ")}${postfix(seconds, "s")}`
}

/**
 * Parse string in format "(days)d (hours)h (minutes)m (seconds)s" into seconds
 * using regular expression.
 */
export const parseDuration = (value) => {
  const regex = /(\d+d)?\s*(\d+h)?\s*(\d+m)?\s*(\d+s)?/i
  const match = regex.exec(value)
  if (!match) return 0
  const [, days, hours, minutes, seconds] = match
  return (parseInt(days, 10) || 0) * 3600 * 24 +
    (parseInt(hours, 10) || 0) * 3600 +
    (parseInt(minutes, 10) || 0) * 60 +
    (parseInt(seconds, 10) || 0)
}

export class StoreUpdatesOnly {
  constructor(updateFn) {
    this.updateFn = updateFn
    this.init = false
  }

  onUpdate = (state) => {
    const {updateFn} = this
    if (this.init)
      return updateFn(value)
    this.init = true
    return state
  }
}

export function jsonPointerGet(obj, path, default_ = null) {
  try {
    return JsonPointer.get(obj, path)
  } catch {
    return default_
  }
}
