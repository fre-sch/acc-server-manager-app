import JsonPointer from "json-pointer"

const toObjectByPointer = (acc, [k, v]) => (JsonPointer.set(acc, k, v), acc)
const toFlatObject = (acc, [k, v]) => ((acc[k] = v), acc)

export function submitJson(node, handlerFunction) {
  const submitHandler = (domEvent) => {
    domEvent.preventDefault()
    const formData = new FormData(domEvent.target)
    const formValue = Array.from(formData).reduce(toObjectByPointer, {})
    handlerFunction(formValue)
  }
  node.addEventListener("submit", submitHandler)
  return {
    destroy() {
      node.removeEventListener("submit", submitHandler)
    },
  }
}

export function submitJsonFlat(node, handlerFunction) {
  const submitHandler = (domEvent) => {
    domEvent.preventDefault()
    const formData = new FormData(domEvent.target)
    const formValue = Array.from(formData).reduce(toFlatObject, {})
    handlerFunction(formValue)
  }
  node.addEventListener("submit", submitHandler)
  return {
    destroy() {
      node.removeEventListener("submit", submitHandler)
    },
  }
}
