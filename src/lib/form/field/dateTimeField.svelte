<script>
  import Input from "$lib/form/field/input.svelte"
  import DateRelative from "$lib/dateRelative.svelte"

  export let id
  export let name
  export let label = null
  export let description = null
  export let schema
  export let value

  let step = 1 // enables seconds in date time format
  let type = schema.format == "date-time" ? "datetime-local" : schema.format

</script>

{#if schema.view === "view-only"}
  <label for={id}>{label}</label>
  <div><DateRelative {id} {value} /></div>
{:else}
  <Input
    {id}
    {name}
    {label}
    {description}
    {value}
    {type}
    {step}
    />
{/if}
