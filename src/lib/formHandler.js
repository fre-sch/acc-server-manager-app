import JsonPointer from "json-pointer"

const toObject = (acc, [k, v]) => (JsonPointer.set(acc, k, v), acc)

export function submitJSON(node, handlerFunction) {
  const submitHandler = (domEvent) => {
    domEvent.preventDefault()
    const formData = new FormData(domEvent.target)
    const formValue = Array.from(formData).reduce(toObject, {})
    handlerFunction(formValue)
  }
  node.addEventListener("submit", submitHandler)
  return {
    destroy() {
      node.removeEventListener("submit", submitHandler)
    },
  }
}
