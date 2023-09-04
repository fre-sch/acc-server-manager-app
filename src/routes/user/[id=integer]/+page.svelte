<script>
  import { submitJson } from "$lib/formHandler.js"
  import { page } from "$app/stores"
  import { openApiSchema } from "$lib/store"
  import ApiConnector from "$lib/apiConnector"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import { jsonPointerGet } from "$lib/util"
  import resolved from "$lib/schema"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }

  async function fetchData() {
    const user_id = $page.params.id
    const response = await ApiConnector.get("/user/" + user_id)
    return response.data
  }
  const schema = resolved(
    {"$ref": "#/components/schemas/UserUpdate"},
    $openApiSchema)
</script>

{#await fetchData()}
<h2>Editing User ...</h2>
<Spinner/>

{:then data}
<h2>Editing User {data.id}</h2>
<form class="form-grid" use:submitJson={submit}>
  <SchemaFields
    schema={schema}
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
