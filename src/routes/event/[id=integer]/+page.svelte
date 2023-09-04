<script>
  import { submitJson } from "$lib/formHandler.js"
  import { page } from "$app/stores"
  import { openApiSchema } from "$lib/store"
  import ApiConnector from "$lib/apiConnector"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import {jsonPointerGet} from "$lib/util"
  import resolved from "$lib/schema"
  import {writable} from "svelte/store"
  import { goto } from "$app/navigation"

  const entityId = $page.params.id
  const validationResults = writable(null)

  const submit = (formResult) => {
    const action = formResult[":action"]
    delete formResult[":action"]
    console.debug(formResult)

    if (action === "delete") {
      if (confirm("Are you sure about that?!")) {
        ApiConnector
          .delete(`/event/${entityId}`)
          .then(response => goto("/event", {invalidateAll:true}))
      }
    }
    else if (action === "save-duplicate") {
      ApiConnector.post("/event/", formResult)
      .then(response => goto(`/event/${response.data.id}`, {invalidateAll:true}))
      .catch(error => {
        if (error.response.status === 422) {
          $validationResults = error.response.data.detail
        }
      })
    }
    else {
      ApiConnector.patch(`/event/${entityId}`, formResult)
      .then(response => console.debug(response))
      .catch(error => {
        if (error.response.status === 422) {
          $validationResults = error.response.data.detail
        }
      })
    }
  }

  async function fetchData() {
    const response = await ApiConnector.get(`/event/${entityId}`)
    return response.data
  }
  const schema = resolved(
    {"$ref": "#/components/schemas/EventUpdateRequest"},
    $openApiSchema)

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
    <button name="delete" type="submit" class="btn btn-danger">Delete</button>
    <button name="save-duplicate" type="submit" class="btn btn-primary">Save duplicate</button>
    <button name="save" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>

{:catch error}
  {#if error.response.status == 404}
  <strong>Not found</strong>
  {/if}
{/await}
