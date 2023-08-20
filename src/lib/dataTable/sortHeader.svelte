<script>
  import { writable } from "svelte/store"
  import Icon from "$lib/icon.svelte"

  export let column = {}
  export let update = (value) => {}
  let value = writable("")

  // const updateSubscriber = (current) => {
  //   const self = updateSubscriber;
  //   if (self.__inner__)
  //     self.__inner__(current)
  //   else
  //     self.__inner__ = (current) => {
  //       console.debug("sortHeader.value.subscriber", current)
  //       update(column.sortable, current)
  //     }
  // }
  // delete updateSubscriber.__inner__

  // value.subscribe(updateSubscriber)

  function nextValue(current) {
    if (current === "")
      return "asc"
    if (current === "asc")
      return "desc"
    return ""
  }

  function click() {
    value.update(nextValue)
    update(column.sortable, $value)
  }

  function iconFromValue (current) {
    if (current === "asc")
      return "sort-down-alt"
    if (current === "desc")
      return "sort-down"
    return ""
  }

</script>

<th class="sorting-header">
  <a href={"#" + column.sortable}
    class="nav-link"
    on:click|preventDefault={click}>
    {column.header.title}
    &nbsp;
    <Icon cls={iconFromValue($value)} />
  </a>
</th>
