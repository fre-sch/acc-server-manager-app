
export const setCookie = (name, value, options = {}) => {
  options = {
    [name]: value,
    path: "/",
    ...options,
  }
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }
  const cookieValue = Object.keys(options)
    .map((key) => `${key}=${options[key]}`)
    .join("; ")
  document.cookie = cookieValue
}

export const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  )
  return matches ? decodeURIComponent(matches[1]) : null
}
