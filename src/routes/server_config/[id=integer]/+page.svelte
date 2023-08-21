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

  async function load() {
    const user_id = $page.params.id
    const response = await ApiConnector.get("/event/" + user_id)
    return response.data
  }

  const schema = jsonPointerGet(
    $openApiSchema, "#/components/schemas/ServerConfigUpdate")

  function getFieldValue(value, path) {
    return jsonPointerGet(value, path)
  }
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
    {getFieldValue}
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
