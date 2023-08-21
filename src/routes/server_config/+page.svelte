<script>
  import ApiConnector from "$lib/apiConnector.js"
  import DataTable from "$lib/dataTable/dataTable.svelte"
  import DateRelativeCell from "$lib/dataTable/dateRelativeCell.svelte"
  import NavigateCell from "$lib/dataTable/navigateCell.svelte"
  import {
    initSortableColumns, toApiSort, newSortQueryStore
  } from "$lib/dataTable/utils.js"
  import JsonPointer from "json-pointer"

  let columns = [
    {
      header: { title: "ID" },
      body: {
        view: NavigateCell,
        href: (item) => "/server_config/" + item.id,
        content: (item) =>
          `${item.id} <i class="ms-1 me-1 bi bi-arrow-up-right-square"/>`
      },
      width: 1
    },
    {
      header: { title: "Name" },
      body: { value: "/name", },
      width: 3,
      filterable: "name",
      sortable: "name",
    },
    {
      header: { title: "Created", },
      body: {
        view: DateRelativeCell,
        value: "/created"
      },
      width: 2,
      sortable: "created",
    },
  ]
  let sortQueryStore = newSortQueryStore(columns)
  initSortableColumns(columns, sortQueryStore)

  async function fetchData(currentSort) {
    const response = await ApiConnector
      .post("/server_config/_filter", {
        query: [],
        sort: toApiSort(currentSort)
      })
    return response.data.items
  }

</script>

<DataTable
  {columns}
  getItems={fetchData($sortQueryStore)}
  getValue={JsonPointer.get}/>
