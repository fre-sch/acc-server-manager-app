import { jsonPointerGet } from "$lib/util"


export default function resolved(schema, referenceBase) {
  if (schema["$ref"] !== undefined) {
    schema = jsonPointerGet(referenceBase, schema["$ref"])
  }
  for (const key of Object.keys(schema.properties ?? {})) {
    schema.properties[key] = resolved(schema.properties[key], referenceBase)
    if (schema.properties[key].type === "array") {
      schema.properties[key].items = resolved(
        schema.properties[key].items, referenceBase)
    }
  }
  return schema
}
