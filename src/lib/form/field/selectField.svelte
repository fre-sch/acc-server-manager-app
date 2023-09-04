<script>
  import classnames from "classnames/dedupe"
  import isNil from "lodash/isNil"

  export let id
  export let name
  export let label = null
  export let description = null
  export let schema = null
  export let value
  export let required = false
  export let validationResults = null

  $: isInvalid = validationResults?.length > 0
  $: validationMessages = validationResults?.map(it => it.msg) ?? []

</script>

{#if (!isNil(label))}
  <label for={id} class="form-label"
    class:required>
    {label}
  </label>
{/if}
<div class="form-item">
  <select
    {id}
    {name}
    class={classnames("form-select")}
    {required}
    aria-describedby={`${id}/description ${id}/validation`}>
    {#if isNil(schema.options)}
      {#each schema.enum as optionValue}
        <option
          value={optionValue}
          selected={value===optionValue}>{optionValue}</option>
      {/each}
    {:else}
      {#each schema.options as option}
        <option
          value={option.value}
          selected={value===option.value}>{option.label}</option>
      {/each}
    {/if}
  </select>
  <div id={`${id}/validation`} class="invalid-feedback">
    {#each validationMessages as message}
      <p>{message}</p>
    {/each}
  </div>
  {#if !isNil(description)}
    <div id={`${id}/description`} class="form-text">{ description }</div>
  {/if}
</div>
