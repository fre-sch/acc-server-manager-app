<script>
  import { submitJSON } from "$lib/formHandler.js"
  import { page } from "$app/stores"
  import { openApiSchema } from "$lib/store"
  import ApiConnector from "$lib/apiConnector"
  import Spinner from "$lib/spinner.svelte"
  import SchemaFields from "$lib/form/schemaFields.svelte"
  import { jsonPointerGet } from "$lib/util"

  const submit = (formResult) => {
    console.debug("user form result", formResult)
  }

  async function loadUser() {
    const user_id = $page.params.id
    const response = await ApiConnector.get("/user/" + user_id)
    return response.data
  }
  const schema = $openApiSchema.ref("#/components/schemas/UserUpdate")

</script>

{#await loadUser()}
<Spinner/>

{:then data}
<form class="form-grid" use:submitJSON={submit}>
  <SchemaFields schema={schema} getFieldValue={(pointer) => jsonPointerGet(data, pointer)} />
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
