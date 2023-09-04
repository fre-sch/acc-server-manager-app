<script>
  import isNil from "lodash/isNil"

  export let id
  export let name
  export let value

</script>

{#if !isNil(value)}
<input {id} {name} type="hidden" {value} />
{/if}
