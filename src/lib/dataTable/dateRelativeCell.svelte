<script>
  import DateRelative from "$lib/dateRelative.svelte"
  import get from "lodash/get"
  export let column
  export let item

  $: value = get(item, column.body.value)
</script>

<td><DateRelative {value} /></td>
