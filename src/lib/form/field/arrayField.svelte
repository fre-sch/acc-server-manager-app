<script>
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import isNil from "lodash/isNil"
  import classnames from "classnames/dedupe"
  import Icon from "$lib/icon.svelte"
  import { writable } from "svelte/store"

  export let id
  export let pointer
  export let name
  export let label = null
  export let schema
  export let description = null
  export let value
  export let getFieldValue
  export let css = {}

  const value_ = writable(value ?? [])

  function moveItemUp(event) {
    const { itemIndex } = event.currentTarget.dataset
    value_.update(current => {
      const spliced = current.splice(itemIndex, 1)
      current.splice(Math.max(itemIndex - 1, 0), 0, ...spliced)
      return current
    })
  }

  function moveItemDown(event) {
    const { itemIndex } = event.currentTarget.dataset
    value_.update(current => {
      const spliced = current.splice(itemIndex, 1)
      current.splice(Math.min(itemIndex + 1, current.length), 0, ...spliced)
      return current
    })
  }

  function removeItem(event) {
    const { itemIndex } = event.currentTarget.dataset
    value_.update(current => {
      const spliced = current.splice(itemIndex, 1)
      console.debug("spliced", spliced)
      return current
    })
  }

  function addNewItem() {
    value_.update((current) => {
      current.push(null)
      return current
    })
  }

  function removeAllItems() {
    value_.set([])
  }

</script>

{#if (!isNil(label))}
  <label for={id} class={classnames("form-label", css?.label)}>
    {label}
  </label>
{/if}
<div {id} {name} class="form-array">
  {#if (!isNil(description))}
  <div class="form-description">
    <div class="form-text">{ description }</div>
  </div>
  {/if}

  <button type="button" class="btn btn-sm btn-primary"
    on:click={addNewItem}>
    <Icon cls="plus-lg"/> Add New
  </button>

  <button type="button" class="btn btn-sm btn-danger"
    on:click={removeAllItems}>
    <Icon cls="trash"/> Remove All
  </button>
  {#each $value_ as item, index}
    {@const itemPointer = `${pointer}/${index}/`}
    <fieldset class="form-array-item" name={itemPointer}>
      <div class="form-grid">
        <SchemaFields
          schema={schema.items}
          value={item}
          pointer={itemPointer}
          {getFieldValue}
          />
      </div>
      <div class="form-array-item-controls btn-group-vertical">
        <button type="button"
          class="btn btn-sm btn-light"
          class:disabled={index == 0}
          data-item-index={index}
          on:click={moveItemUp}>
          <Icon cls="chevron-up"/>
        </button>
        <button type="button" class="btn btn-sm btn-light"
          data-item-index={index}
          on:click={removeItem}>
          <Icon cls="trash"/>
        </button>
        <button type="button"
          class="btn btn-sm btn-light"
          class:disabled={index==$value_.length-1}
          data-item-index={index}
          on:click={moveItemDown}>
          <Icon cls="chevron-down"/>
        </button>
      </div>
    </fieldset>
  {/each}
</div>
