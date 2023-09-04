<script>
  import { submitJson } from "$lib/formHandler.js"
  import { openApiSchema } from "$lib/store"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import resolved from "$lib/schema.js"
  import ApiConnector from "$lib/apiConnector.js"
  import {writable} from "svelte/store"

  const validationResults = writable(null)

  const submit = (formResult) => {
    ApiConnector.post("/event/", formResult)
    .then(response => {
      console.debug(response)
    })
    .catch(error => {
      if (error.response.status === 422) {
        $validationResults = error.response.data.detail
      }
    })
  }

  const schema = resolved({
    "$ref": "#/components/schemas/EventCreateRequest"
  }, $openApiSchema)
</script>

<h2>Create event</h2>

<form class="form-grid" use:submitJson={submit}>
  <SchemaFields schema={schema} />
  <div />
  <div class="form-footer">
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
