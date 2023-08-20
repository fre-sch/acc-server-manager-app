<script>
  import classnames from "classnames/dedupe"

  export let id
  export let label
  export let name
  export let schema
  export let description = null
  export let value
  export let css = {
    label: "form-check-Label",
    input: "form-check-input"
  }
</script>

<label for={id} class={classnames("form-check-label", css.label)}>
  {label}
</label>
<div>
  <input type="hidden" {name} value={false} />
  <input
    type="checkbox"
    {name}
    checked={Boolean(value)}
    value={true}
    class={
      classnames("form-check-input", css.input)
    }
  />
  {#if (description !== undefined)}
  <div class="form-description">{description}</div>
  {/if}
</div>
