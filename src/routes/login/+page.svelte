<script>
  import LoginForm from "$lib/loginForm.svelte"
  const submit = (formResult) => {
    console.debug("login form result", formResult)
  }
</script>

<div id="login-page">
<LoginForm {submit}/>
</div>

<style>
  #login-page {
    margin: 0 auto;
    width: 40vw;
  }
</style>
