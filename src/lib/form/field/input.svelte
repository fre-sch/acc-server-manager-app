<script>
  import isNil from "lodash/isNil"
  import classnames from "classnames/dedupe"
  import InputGroup from "$lib/form/field/inputGroup.svelte"

  export let id
  export let name
  export let label
  export let type
  export let description = null
  export let prefix = null
  export let postfix = null
  export let value = null
  export let placeholder = null
  export let css = null
  export let required = false
  export let validationResults = null
  export let getFieldValue = null

  $: isInvalid = validationResults?.length > 0
  $: validationMessages = validationResults?.map(it => it.msg) ?? []

</script>

{#if (!isNil(label))}
  <label for={id}
    class={classnames("form-label", css?.label)}
    class:required>
    {label}
  </label>
{/if}

<div class="form-item">
  <InputGroup {prefix} {postfix}>
    <input
      {id}
      {name}
      class={classnames("form-control", css?.input)}
      class:is-invalid={isInvalid}
      {type}
      {value}
      {placeholder}
      aria-describedby={`${id}/description ${id}/validation`}
      {required}
      {...$$restProps}
    />
  </InputGroup>
  <div id={`${id}/validation`} class="invalid-feedback">
    {#each validationMessages as message}
      <p>{message}</p>
    {/each}
  </div>
  {#if (!isNil(description))}
  <div id={`${id}/description`} class="form-text">{ description }</div>
  {/if}
</div>
