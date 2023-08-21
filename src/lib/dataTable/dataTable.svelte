<script>
  import classnames from "classnames/dedupe"
  import isArray from "lodash/isArray"
  import Spinner from "$lib/spinner.svelte"

  export let columns = []
  export let getItems = async function() {
    return []
  }
  export let getValue = () => {}

  function _number(val) {
    try {
      return (parseFloat(val) || 1)
    }
    catch {
      return 1
    }
  }

  function columnFractions() {
    const widths = columns.map(col => _number(col.width))
    const totalWidth = widths.reduce((agg, curr) => agg + curr, 0)
    return widths.map(it =>
      Math.round(it / totalWidth * 100)
    )
  }
</script>

<div class="data-table">
  <table class="table table-hover table-sm p-0 table-fixed">
    <colgroup>
      {#each columnFractions() as fract, index}
        <col key={index} style:width={`${fract}%`} />
      {/each}
    </colgroup>
    <thead class="table-light">
      <tr>
        {#each columns as column}
          {#if isArray(column.header?.view)}
            <svelte:component
              this={column.header.view[0]}
              {...column.header.view[1]}
              {column}
            />
          {:else}
            <th class={classnames(column.header?.classnames)}>
              {column.header?.title}
            </th>
          {/if}
        {/each}
      </tr>
    </thead>
    {#await getItems}
      <tbody class="error">
        <tr>
          <td colspan={columns.length}>
            <Spinner/>
          </td>
        </tr>
      </tbody>
    {:then items}
      <tbody class="data">
        {#each items as item, index}
          <tr key={index}>
            {#each columns as column}
              {#if typeof column.body?.view === "function"}
                <svelte:component
                  this={column.body.view}
                  {column}
                  {item}
                  {getValue}
                />
              {:else if typeof column.body?.value === "function"}
                <td class={classnames(column.body.classnames)}>
                  {column.body.value.call(column, item)}
                </td>
              {:else}
                <td class={classnames(column.body?.classnames)}>
                  {getValue(item, column.body?.value)}
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    {:catch error}
      <tbody class="error">
        <tr>
          <td colspan={columns.length}>
            {#if error.response.status == 404}
            <strong>Not found</strong>
            <pre>{error.response.body}</pre>
            {/if}
          </td>
        </tr>
      </tbody>
    {/await}
  </table>
  <slot/>
</div>

<style>
table.table-fixed {
  table-layout: fixed;
}

.table-fixed th,
.table-fixed td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.table-hover tbody tr {
  cursor: pointer;
}

.table-vm td,
.table-vm th {
  vertical-align: middle;
}
</style>
