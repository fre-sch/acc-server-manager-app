import ApiConnector from "$lib/apiConnector.js"

export const prerender = true
export const ssr = false

export async function load () {
  const response = await ApiConnector.get("openapi.json")
  return response.data
}
