<script>
  import ApiConnector from "$lib/apiConnector.js"
  import DataTable from "$lib/dataTable/dataTable.svelte"
  import DateRelativeCell from "$lib/dataTable/dateRelativeCell.svelte"
  import NavigateCell from "$lib/dataTable/navigateCell.svelte"
  import { initSortableColumns, toApiSort, newSortQueryStore } from "$lib/dataTable/utils.js"
  import JsonPointer from "json-pointer"

  let columns = [
    {
      header: {
        title: "ID"
      },
      body: {
        view: NavigateCell,
        href: (item) => "/user/" + item.id,
        content: (item) => `${item.id} <i class="ms-1 me-1 bi bi-arrow-up-right-square"/>`
      },
      width: 1
    },
    {
      header: { title: "mail", },
      body: { value: "/mail", },
      width: 6,
      filterable: "mail",
      sortable: "mail",
    },
    {
      header: { title: "scopes", },
      body: { value: "/scopes", },
      width: 6,
      filterable: "scopes",
      sortable: "scopes",
    },
    {
      header: { title: "created", },
      body: { view: DateRelativeCell, value: "/created" },
      width: 4,
      sortable: "created",
    },
    {
      header: { title: "last_login", },
      body: { value: "/last_login", view: DateRelativeCell },
      width: 4,
      sortable: "last_login",
    },
    {
      header: { title: "is_enabled", },
      body: { value: "/is_enabled", },
      width: 6,
      filterable: "is_enabled",
      sortable: "is_enabled",
    },
  ]
  let sortQueryStore = newSortQueryStore(columns)
  initSortableColumns(columns, sortQueryStore)

  async function fetchUsers(currentSort) {
    const response = await ApiConnector
      .post("/user/_filter", {
        query: [],
        sort: toApiSort(currentSort)
      })
    return response.data.items
  }
</script>

<DataTable
  {columns}
  getItems={fetchUsers($sortQueryStore)}
  getValue={JsonPointer.get}
/>
