<script>
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import isNil from "lodash/isNil"
  import isEmpty from "lodash/isEmpty"
  import classnames from "classnames/dedupe"

  export let id
  export let pointer
  export let name
  export let label = null
  export let schema
  export let description = null
  export let value
  export let getFieldValue
  export let css = {}

</script>

<fieldset {id} {name} class="form-object">
  {#if (!isEmpty(label))}
  <legend>{label}</legend>
  {/if}
  {#if (!isEmpty(description))}
  <div class="form-description">
    <div class="form-text">{ description }</div>
  </div>
  {/if}

  <div class="form-grid">
    <SchemaFields
      schema={schema}
      {value}
      {getFieldValue}
      />
  </div>
</fieldset>
