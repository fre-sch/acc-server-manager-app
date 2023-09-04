<script>
  import { submitJson } from "$lib/formHandler.js"
  import { page } from "$app/stores"
  import { openApiSchema } from "$lib/store"
  import ApiConnector from "$lib/apiConnector"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import {jsonPointerGet} from "$lib/util"
  import resolved from "$lib/schema"
  import { writable } from "svelte/store"

  let entityId = $page.params.id
  let validationResults = writable(null)

  const submit = (formResult) => {
    ApiConnector.post(`/server_config/${entityId}`, formResult)
    .then(response => {
      console.debug(response)
    })
    .catch(error => {
      if (error.response.status === 422) {
        $validationResults = error.response.data.detail
      }
    })
  }

  async function load() {
    const response = await ApiConnector.get(`/server_config/${entityId}`)
    return response.data
  }

  const schema = resolved(
    {"$ref": "#/components/schemas/ServerConfigUpdate"},
    $openApiSchema)

</script>


{#await load()}
<h2>Editing Server Config ...</h2>
<Spinner/>

{:then data}
<h2>Editing Server Config {data.id}</h2>
<form class="form-grid" use:submitJson={submit}>
  <SchemaFields
    {schema}
    value={data}
    validationResults={$validationResults}
    getFieldValue={jsonPointerGet}
  />
  <div />
  <div class="form-footer">
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>

{:catch error}
  {#if error.response.status == 404}
  <strong>Not found</strong>
  {/if}
{/await}
