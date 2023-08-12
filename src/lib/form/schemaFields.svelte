<script>
  import StringField from "$lib/form/field/stringField.svelte"
  import CheckboxField from "$lib/form/field/checkboxField.svelte"
  import NumberField from "$lib/form/field/numberField.svelte"
  import DateTimeField from "$lib/form/field/dateTimeField.svelte"
  import SelectField from "$lib/form/field/selectField.svelte"
  import EmailField from "$lib/form/field/emailField.svelte"
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
      [/.*/, Input],
    ]
  }

  function fieldSchemaView (schema) {
    if (schema.view) return schema.view
    if (schema.enum) return "enum"
    return ""
  }

  function fieldSpec (fieldSchema) {
    const fieldViewStr = fieldSchemaView(fieldSchema)
    const spec = `${fieldSchema.type}:${fieldSchema.format || ""}:${fieldViewStr}`
    return spec
  }

  function fieldView (fieldSchema, views) {
    const spec = fieldSpec(fieldSchema)
    const viewEntry = views.find(
      (item) => item[0].test(spec)
    )
    return viewEntry[1]
  }

  function schemaProperties(schema) {
    try {
      return Object.entries(schema.properties)
    }
    catch (error) {
      console.error("schema object with properties expected, got", schema)
    }
    return []
  }

  function listSchemaFields (schema) {
    return schemaProperties(schema).map(
      (entry) => {
        return {
          ...entry[1],
          name: entry[0]
        }
      }
    )
  }

  function fieldLabel (fieldSchema) {
    if (fieldSchema.title !== undefined) {
      return fieldSchema.title
    }
    return startCase(fieldSchema.name)
  }

  export let views = defaultViews()
  export let schema;
  export let getFieldValue = (name) => {}

</script>

{#each listSchemaFields(schema) as fieldSchema, idx}
  <svelte:component
    id={fieldSchema.name}
    this={fieldView(fieldSchema, views)}
    key={idx}
    name={fieldSchema.name}
    schema={fieldSchema}
    label={fieldLabel(fieldSchema)}
    description={fieldSchema.description}
    {getFieldValue}
  />
{/each}
