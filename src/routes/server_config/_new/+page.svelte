<script>
  import { submitJson } from "$lib/formHandler.js"
  import { openApiSchema } from "$lib/store"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import resolved from "$lib/schema"
  import ApiConnector from "$lib/apiConnector"
  import {writable} from "svelte/store"

  let validationResults = writable(null)

  const submit = (formResult) => {
    ApiConnector.post("/server_config/", formResult)
    .then(response => {
      console.debug(response)
    })
    .catch(error => {
      if (error.response.status === 422) {
        $validationResults = error.response.data.detail
      }
    })
  }
  const schema = resolved(
    {"$ref":  "#/components/schemas/ServerConfigCreate"},
    $openApiSchema)

  async function schemaWithEventOptions(schema) {
    const result = await ApiConnector.post("/event/_filter", {
      query: [],
      sort: []
    })
    schema.properties.event_id.options = result.data.items
      .map(it => ({value: it.id, label: it.name}))
    console.debug(schema.properties.event_id)
    return schema
  }
</script>

<h2>Create server config</h2>
{#await schemaWithEventOptions(schema) then schema}
  <form
    class="form-grid"
    use:submitJson={submit}>
    <SchemaFields
      {schema}
      validationResults={$validationResults}
    />
    <div class="form-footer">
      <button name="save" type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
{/await}
