<script>
  import classnames from "classnames/dedupe"
  import InputGroup from "$lib/form/field/inputGroup.svelte"

  export let id;
  export let name;
  export let label;
  export let description;
  export let prefix;
  export let postfix;
  export let type;
  export let value = null;
  export let placeholder;
  export let css;

</script>

{#if (label !== undefined)}
  <label for={id} class={classnames("form-label", css?.label)}>
    {label}
  </label>
{/if}
{#if (description !== undefined)}
  <div class="form-description">
    <InputGroup prefix={prefix} postfix={postfix}>
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
