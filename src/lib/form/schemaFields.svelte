<script>
  import StringField from "$lib/form/field/stringField.svelte"
  import CheckboxField from "$lib/form/field/checkboxField.svelte"
  import NumberField from "$lib/form/field/numberField.svelte"
  import DateTimeField from "$lib/form/field/dateTimeField.svelte"
  import SelectField from "$lib/form/field/selectField.svelte"
  import EmailField from "$lib/form/field/emailField.svelte"
  import ArrayField from "$lib/form/field/arrayField.svelte"
  import Input from "$lib/form/field/input.svelte"
  import startCase from "lodash/startCase"


  function defaultViews() {
    return [
      // schema.type:schema.format:schema.view|"enum"
      [/^bool/, CheckboxField],
      [/^(integer|float|number)/, NumberField],
      [/^(text|string):(date|time).*:/, DateTimeField],
      [/^(text|string):[^:]*:enum/, SelectField],
      [/^(text|string):email/, EmailField],
      [/^(text|string):/, StringField],
      [/^array:/, ArrayField],
      [/.*/, Input],
    ]
  }

  function fieldComponent (fieldSchema, views) {
    const viewEntry = views.find(
      (item) => item[0].test(fieldSchema.specifier)
    )
    return viewEntry[1]
  }

  function fieldLabel (fieldSchema) {
    if (fieldSchema.title !== undefined) {
      return fieldSchema.title
    }
    return startCase(fieldSchema.name)
  }

  export let views = defaultViews()
  export let schema
  export let value = {}
  export let pointer = "/"
  // eslint-disable-next-line no-unused-vars
  export let getFieldValue = (value, fieldName) => {}

  function fieldSchemaView(schema) {
    if (schema.view !== undefined)
      return schema.view

    if (schema.enum !== undefined)
      return "enum"

    return ""
  }

  function fieldSchemaSpecifier(schema) {
    schema.view = fieldSchemaView(schema)
    schema.specifier = `${schema.type}:${schema.format || ""}:${schema.view}`
    return schema
  }

  function listProperties(schema) {
    const properties = Object
      .entries(schema.properties)
      .map(([name, fieldSchema]) => fieldSchemaSpecifier({
        ...fieldSchema,
        relPointer: "/" + name,
        absPointer: pointer + name,
      }))
    return properties
  }
</script>

{#each listProperties(schema) as fieldSchema}
  <svelte:component
    this={fieldComponent(fieldSchema, views)}
    pointer={fieldSchema.absPointer}
    id={fieldSchema.absPointer}
    name={fieldSchema.absPointer}
    schema={fieldSchema}
    label={fieldLabel(fieldSchema)}
    description={fieldSchema.description}
    value={getFieldValue(value, fieldSchema.relPointer)}
    {getFieldValue}
  />
{/each}
