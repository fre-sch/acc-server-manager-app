<script>
  import Input from "$lib/form/field/input.svelte"

  export let id
  export let name
  export let label = null
  export let description = null
  export let schema
  export let value
</script>

<Input
  {id}
  {name}
  {label}
  {description}
  {value}
  type="number"
  max={schema.maximum}
  min={schema.minimum}
  step={schema.multipleOf}
  {...$$restProps}
  />
