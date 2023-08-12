<script>
  import Input from "$lib/form/field/input.svelte"

  export let id;
  export let name;
  export let label;
  export let description;
  export let schema;
  export let getFieldValue;

</script>


<Input
  {id}
  {name}
  {label}
  {description}
  value={getFieldValue(schema.name)}
  type="email"
  />
