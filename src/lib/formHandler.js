import JsonPointer from "json-pointer"

const toObjectByPointer = (acc, [k, v]) => (JsonPointer.set(acc, k, v), acc)
const toFlatObject = (acc, [k, v]) => ((acc[k] = v), acc)

export function submitJson(node, handlerFunction) {
  const submitHandler = (submitEvent) => {
    submitEvent.preventDefault()
    const formData = new FormData(submitEvent.target)
    const formValue = Array.from(formData).reduce(toObjectByPointer, {})
    formValue[":action"] = submitEvent.submitter.name
    handlerFunction(formValue, submitEvent)
  }
  node.addEventListener("submit", submitHandler)
  return {
    destroy() {
      node.removeEventListener("submit", submitHandler)
    },
  }
}

export function submitJsonFlat(node, handlerFunction) {
  const submitHandler = (submitEvent) => {
    submitEvent.preventDefault()
    const formData = new FormData(submitEvent.target)
    const formValue = Array.from(formData).reduce(toFlatObject, {})
    formValue[":action"] = submitEvent.submitter.name
    handlerFunction(formValue, submitEvent)
  }
  node.addEventListener("submit", submitHandler)
  return {
    destroy() {
      node.removeEventListener("submit", submitHandler)
    },
  }
}
