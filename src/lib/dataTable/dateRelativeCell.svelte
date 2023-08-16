<script>
  import DateRelative from "$lib/dateRelative.svelte"
  export let column
  export let item
  export let getValue
</script>

<td><DateRelative value={getValue(item, column.body.value)} /></td>
