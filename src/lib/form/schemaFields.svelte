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
  import JsonPointer from "json-pointer"


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
  export let schema;
  export let value = {}
  export let arrayIndex = null;

  function getFieldValue(obj, path, default_ = null) {
    // console.debug("getFieldValue", obj, path)
    try {
      return JsonPointer.get(obj, path)
    } catch {
      return default_
    }
  }
</script>

{#each schema.propertiesList as fieldSchema}
  <svelte:component
    this={fieldComponent(fieldSchema, views)}
    id={fieldSchema.valuePointer(arrayIndex)}
    name={fieldSchema.valuePointer(arrayIndex)}
    schema={fieldSchema}
    label={fieldLabel(fieldSchema)}
    description={fieldSchema.description}
    value={getFieldValue(value, fieldSchema.valuePointer(arrayIndex))}
  />
{/each}
