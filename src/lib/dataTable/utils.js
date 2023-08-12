import SortHeader from "$lib/dataTable/sortHeader.svelte"
import { writable } from "svelte/store"

export function initSortableColumns (columns, sortQueryStore) {
  function update(sortKey, value) {
    sortQueryStore.update((current) => ({
      ...current,
      [sortKey]: value,
    }))
  }

  for (const column of columns)
    if (column.sortable)
      column.header.view = [
        SortHeader,
        {
          update,
        },
      ]

  return columns
}

export function newSortQueryStore (columns) {
  return writable(
    columns
      .filter((it) => it.sortable !== undefined)
      .reduce((acc, it) => ((acc[it.sortable] = ""), {}), {})
  )
}

export function toApiSort (sortQueryObject) {
  return Array
    .from(Object.entries(sortQueryObject))
    .filter((it) => it[1])
}
