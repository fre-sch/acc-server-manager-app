<script>
  import StringField from "$lib/form/field/stringField.svelte"
  import CheckboxField from "$lib/form/field/checkboxField.svelte"
  import NumberField from "$lib/form/field/numberField.svelte"
  import DateTimeField from "$lib/form/field/dateTimeField.svelte"
  import SelectField from "$lib/form/field/selectField.svelte"
  import EmailField from "$lib/form/field/emailField.svelte"
  import ArrayField from "$lib/form/field/arrayField.svelte"
  import ObjectField from "$lib/form/field/objectField.svelte"
  import Input from "$lib/form/field/input.svelte"
  import HiddenField from "$lib/form/field/hiddenField.svelte"
  import startCase from "lodash/startCase"
  import isNil from "lodash/isNil"


  function defaultViews() {
    return [
      // schema.type:schema.format:schema.view|"enum"
      [/^[^:]*:[^:]*:hidden/, HiddenField],
      [/^bool/, CheckboxField],
      [/:[^:]*:(enum|select)/, SelectField],
      [/^(integer|float|number)::/, NumberField],
      [/^(text|string):(date|time).*:/, DateTimeField],
      [/^(text|string):email/, EmailField],
      [/^(text|string):/, StringField],
      [/^array:/, ArrayField],
      [/^object:/, ObjectField],
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
  export let value = null
  export let pointer = "/"
  // eslint-disable-next-line no-unused-vars
  export let getFieldValue = null
  export let validationResults = null

  if (!isNil(value) && isNil(getFieldValue)) {
    throw new Error(
      "`value` is not nil but `getFieldValue` is."
      + " Did you forget to set `getFieldValue`?")
  }


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

  function listPropertiesWithValue(schema, value) {
    return listProperties(schema).map(fieldSchema => [
      fieldSchema,
      getFieldValue?.(value, fieldSchema.relPointer)
    ])
  }

  function fieldValidationResults(validationResults, fieldSchema) {
    return validationResults?.filter(
      it => fieldSchema.absPointer.indexOf(it.loc[1]) !== -1
    )
  }

  function isFieldRequired(schema, fieldSchema) {
    const { required = [] } = schema
    // strip the leading slash
    const requiredName = fieldSchema.relPointer.substring(1)
    return required.indexOf(requiredName) > -1
  }
</script>

{#each listPropertiesWithValue(schema, value) as [fieldSchema, fieldValue]}
  <svelte:component
    this={fieldComponent(fieldSchema, views)}
    pointer={fieldSchema.absPointer}
    id={fieldSchema.absPointer}
    name={fieldSchema.absPointer}
    schema={fieldSchema}
    label={fieldLabel(fieldSchema)}
    description={fieldSchema.description}
    value={fieldValue}
    required={isFieldRequired(schema, fieldSchema)}
    validationResults={fieldValidationResults(validationResults, fieldSchema)}
    {getFieldValue}
  />
{/each}
