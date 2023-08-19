<script>
  import classnames from "classnames/dedupe"
  import isNil from "lodash/isNil"

  export let id;
  export let name;
  export let label = null;
  export let description = null;
  export let schema = null;
  export let value;

</script>

{#if (!isNil(label))}
  <label for={id} class={classnames("form-label")}>
    {label}
  </label>
{/if}
{#if (description !== undefined)}
  <div class="form-description">
    <select {id} {name} class={classnames("form-select")}>
      {#each schema.enum as optionValue}
        <option value={optionValue} selected={value===optionValue}>{optionValue}</option>
      {/each}
    </select>
    <div class="form-text">{ description }</div>
  </div>
{:else}
  <select {id} {name} class={classnames("form-select")}>
  </select>
{/if}
