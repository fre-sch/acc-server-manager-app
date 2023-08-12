<script>
  import classnames from "classnames/dedupe"

  export let id;
  export let name;
  export let schema;
  export let description;
  export let getFieldValue = (name) => {}
  export let css = {
    label: "form-check-Label",
    input: "form-check-input"
  }
  let label = schema.name
</script>

<label for={id} class={classnames("form-check-label", css.label)}>
  {label}
</label>
<div>
  <input type="hidden" {name} value={false} />
  <input
    type="checkbox"
    {name}
    checked={getFieldValue(name)}
    value={true}
    class={
      classnames("form-check-input", css.input)
    }
  />
  {#if (description !== undefined)}
  <div class="form-description">{description}</div>
  {/if}
</div>
