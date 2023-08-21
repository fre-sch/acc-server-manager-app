<script>
  import { submitJson } from "$lib/formHandler.js"
  import { openApiSchema } from "$lib/store"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import {jsonPointerGet} from "$lib/util"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }

  const schema = jsonPointerGet(
    $openApiSchema, "#/components/schemas/ServerConfigCreate")
</script>

<h2>Create server config</h2>

<form class="form-grid" use:submitJson={submit}>
  <SchemaFields
    {schema}
  />
  <div />
  <div class="form-footer">
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
