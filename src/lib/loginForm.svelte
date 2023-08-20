<script>
  export let submit = () => {}
</script>

<form class="form-grid" on:submit={submit}>
  <label for="login-username">Username</label>
  <input class="form-control" id="login-username" name="username" type="text"
    autocomplete="username"/>
  <label for="login-password">Password</label>
  <input class="form-control"
    id="login-password"
    name="password"
    type="password"
    autocomplete="current-password"/>
  <div />
  <div class="form-footer">
    <button name="login" type="submit" class="btn btn-primary">login</button>
  </div>
</form>
