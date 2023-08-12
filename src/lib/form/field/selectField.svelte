<script>
  import classnames from "classnames/dedupe"

  export let id;
  export let name;
  export let label;
  export let description;
  export let schema;
  export let getFieldValue;

</script>

{#if (label !== undefined)}
  <label for={id} class={classnames("form-label")}>
    {label}
  </label>
{/if}
{#if (description !== undefined)}
  <div class="form-description">
    <select {id} {name} class={classnames("form-select")}>
    </select>
    <div class="form-text">{ description }</div>
  </div>
{:else}
  <select {id} {name} class={classnames("form-select")}>
  </select>
{/if}
