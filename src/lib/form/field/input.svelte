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

</script>

{#if (!isNil(label))}
  <label for={id} class={classnames("form-label", css?.label)}>
    {label}
  </label>
{/if}
{#if (!isNil(description))}
  <div class="form-description">
    <InputGroup {prefix} {postfix}>
      <input
        {id}
        {name}
        class={classnames("form-control", css?.input)}
        {type}
        {value}
        {placeholder}
        {...$$restProps}
      />
    </InputGroup>
    <div class="form-text">{ description }</div>
  </div>
{:else}
  <input
    {id}
    {name}
    class={classnames("form-control", css?.input)}
    {type}
    {value}
    {placeholder}
    {...$$restProps}
  />
{/if}
