<script>
  export let column
  export let item
</script>

<td>
  <a href={column.body.href(item)} class="text-decoration-none">
    {@html column.body.content(item)}
  </a>
</td>
