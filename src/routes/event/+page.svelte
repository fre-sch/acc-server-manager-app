<script>
  import ApiConnector from "$lib/apiConnector.js"
  import DataTable from "$lib/dataTable/dataTable.svelte"
  import DateRelativeCell from "$lib/dataTable/dateRelativeCell.svelte"
  import { initSortableColumns, toApiSort, newSortQueryStore } from "$lib/dataTable/utils.js"

  let columns = [
    {
      header: {
        title: "ID"
      },
      body: {
        value: "id",
      },
      width: 0.5,
      sortable: "id",
    },
    {
      header: {
        title: "Name"
      },
      body: {
        value: "name",
      },
      width: 3,
      filterable: "name",
      sortable: "name",
    },
    {
      header: {
        title: "Track",
      },
      body: {
        value: "track",
      },
      width: 3,
      filterable: "track",
      sortable: "track",
    },
    {
      header: {
        title: "Sessions",
      },
      body: {
        value: (row) => `${row.sessions.length}: ${row.sessions.map(it => it.name).join(", ")}`,
      },
      width: 6,
    },
    {
      header: {
        title: "Created",
      },
      body: {
        view: DateRelativeCell,
        value: "created"
      },
      width: 2,
      sortable: "created",
    },
  ]
  let sortQueryStore = newSortQueryStore(columns)
  initSortableColumns(columns, sortQueryStore)


  async function fetchData(currentSort) {
    const response = await ApiConnector
      .post("/event/_filter", {
        query: [],
        sort: toApiSort(currentSort)
      })
    return response.data.items
  }

</script>

<DataTable {columns} getItems={fetchData($sortQueryStore)} />
