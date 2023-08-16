function pointerHead(p) {
  const i = p.lastIndexOf("/")
  return p.substring(i + 1)
}

function pointerTail(p) {
  const i = p.lastIndexOf("/")
  return p.substring(0, i)
}

function pointerGet(p, base) {
  return p
    .split("/")
    .reduce((acc, it) => (it === "#" || it === "" ? acc : acc?.[it]), base)
}

function pointerPush(p, ...keys) {
  const endsInSlash = p.lastIndexOf("/") === p.length - 1
  if (endsInSlash) return p + keys.join("/")
  return p + "/" + keys.join("/")
}

function resolved(p, base) {
  let t = pointerGet(p, base)
  if (t["$ref"] !== undefined) return pointerGet(t["$ref"], base)
  return t
}

class SchemaRef {
  constructor(base, pointer, valuePointer="/") {
    this.base = base
    this.pointer = pointer
    this._resolved = null
    this._valuePointer = valuePointer
  }

  resolved() {
    if (this._resolved === null)
      this._resolved = resolved(this.pointer, this.base)
    return this._resolved
  }

  ref(pointer) {
    return new SchemaRef(this.base, pointer)
  }

  get name() {
    return pointerHead(this.pointer)
  }

  get title() {
    return this.resolved().title
  }

  get description() {
    return this.resolved().description
  }

  get view() {
    if (this.resolved().view !== undefined) return this.resolved().view
    if (this.enum !== undefined) return "enum"
    return
  }

  get specifier() {
    return `${this.type}:${this.format || ""}:${this.view}`
  }

  get format() {
    return this.resolved().format
  }

  get enum() {
    return this.resolved().enum
  }

  get pattern() {
    return this.resolved().pattern
  }

  get minimum () {
    return this.resolved().minimum
  }

  get maximum() {
    return this.resolved().maximum
  }

  get multipleOf () {
    return this.resolved().multipleOf
  }

  get required() {
    const parent = pointerTail(pointerTail(this.pointer))
    const schema = pointerGet(parent, this.base)
    return (
      schema.required !== undefined &&
      schema.required.indexOf(pointerHead(this.pointer)) !== -1
    )
  }

  get type() {
    return this.resolved().type
  }

  get items() {
    const itemSchema = resolved(pointerPush(this.pointer, "items"), this.base)
    return new SchemaRef(itemSchema, "#")
  }

  get propertiesList() {
    return Object.keys(this.resolved().properties).map(
      (key) =>
        new SchemaRef(
          this.base,
          pointerPush(this.pointer, "properties", key),
          pointerPush(this._valuePointer, key)
        )
    )
  }

  valuePointer (index) {
    return this._valuePointer.replace("{index}", index)
  }
}

export default SchemaRef
