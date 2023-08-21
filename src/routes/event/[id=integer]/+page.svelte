<script>
  import { submitJson } from "$lib/formHandler.js"
  import { page } from "$app/stores"
  import { openApiSchema } from "$lib/store"
  import ApiConnector from "$lib/apiConnector"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import {jsonPointerGet} from "$lib/util"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }

  async function fetchData() {
    const event_id = $page.params.id
    const response = await ApiConnector.get("/event/" + event_id)
    return response.data
  }
  const schema = jsonPointerGet(
    $openApiSchema, "#/components/schemas/EventUpdateRequest")
  schema.properties.sessions.items = jsonPointerGet(
    $openApiSchema, schema.properties.sessions.items.$ref)

</script>


{#await fetchData()}
<h4>Editing Event ...</h4>
<Spinner/>

{:then data}
<h4>Editing Event {data.id}</h4>
<form class="form-grid" use:submitJson={submit}>
  <SchemaFields
    {schema}
    value={data}
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
