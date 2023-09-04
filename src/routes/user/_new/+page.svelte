<script>
  import { submitJson } from "$lib/formHandler.js"
  import { openApiSchema } from "$lib/store"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import resolved from "$lib/schema"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }

  const schema = resolved(
    {"$ref": "#/components/schemas/UserCreate"},
    $openApiSchema)
</script>

<h2>Create User</h2>

<form class="form-grid" use:submitJson={submit}>
  <SchemaFields
    {schema}
  />
  <div />
  <div class="form-footer">
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
