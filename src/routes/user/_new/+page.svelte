<script>
  import { submitJSON } from "$lib/formHandler.js"
  import { openApiSchema } from "$lib/store"
  import SchemaFields from "../../../lib/form/schemaFields.svelte"
  import get from "lodash/get"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }
  const schema = $openApiSchema.components.schemas.UserCreate
</script>

<form class="form-grid" use:submitJSON={submit}>
  <SchemaFields schema={schema} />
  <div />
  <div class="form-footer">
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
