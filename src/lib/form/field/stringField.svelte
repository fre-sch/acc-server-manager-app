<script>
  import Input from "$lib/form/field/input.svelte"

  export let id
  export let name
  export let label = null
  export let description = null
  export let value
  export let schema

</script>

<Input
  {id}
  {name}
  {label}
  {description}
  {value}
  type="text"
  {...$$restProps}
/>
