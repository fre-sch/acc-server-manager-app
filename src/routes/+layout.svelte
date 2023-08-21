<script>
  import "../app.less"
  import { onMount } from "svelte"
  import LoginForm from "$lib/loginForm.svelte"
  import SidebarNav from "$lib/sidebarNav.svelte"
  import { loginToken, openApiSchema } from "$lib/store.js"
  import { setCookie } from "$lib/cookies.js"
  import ApiConnector from "$lib/apiConnector.js"
  import isNil from "lodash/isNil"
  import { page } from "$app/stores"

  let loginDialog
  export let data

  $: routes = [
    {
      title: "Dashboard",
      icon: "speedometer",
      href: "/",
      active: $page.route.id === "/"
    },
    {
      title: "Server Configs",
      icon: "server",
      href: "/server_config",
      active: $page.route.id.indexOf("/server_config") === 0,
      children: [
        {
          title: "Create server config",
          icon: "plus-square",
          href: "/server_config/_new",
          active: $page.route.id.indexOf("/server_config/_new") === 0,
        }
      ]
    },
    {
      title: "Events",
      icon: "card-list",
      href: "/event",
      active: $page.route.id.indexOf("/event") === 0,
      children: [
        {
          title: "Create event",
          icon: "plus-square",
          href: "/event/_new",
          active: $page.route.id.indexOf("/event/_new") === 0,
        }
      ]
    },
    {
      title: "Users",
      icon: "people",
      href: "/user",
      active: $page.route.id.indexOf("/user") === 0,
      children: [
        {
          title: "Create user",
          icon: "plus-square",
          href: "/user/_new",
          active: $page.route.id.indexOf("/user/_new") === 0,
        }
      ]
    }
  ]

  openApiSchema.set(data)


  function logout () {
    setCookie("token", "", { samesite: "strict", "max-age": -1 })
    loginToken.update(() => null)
  }

  function checkToken () {
    if ($loginToken) {
      ApiConnector
        .post("/auth/token-check", {
          headers: {
            "Authorization": "Bearer" + $loginToken
          }
        })
        .catch(() => {
          loginToken.update(() => null)
        })
    }
  }

  function submit (event) {
    event.preventDefault()
    ApiConnector
      .post("auth/token", event.target)
      .then(response => {
        loginToken.update(() => response.data.access_token)
        loginDialog.close()
      })
  }

  loginToken.subscribe((value) => {
    if (isNil(value)) {
      delete ApiConnector.defaults.headers.common["Authorization"]
      loginDialog?.showModal()
    }
    else {
      ApiConnector.defaults.headers.common["Authorization"] = "Bearer " + value
    }
  })

  onMount(() => {
    checkToken()
    if (isNil($loginToken)) {
      loginDialog.showModal()
    }
  })
</script>

<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"> ACC SERVER MGR </a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav flex-grow-1">
        <a href="/"> Home </a>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link"> Notifications </a>
        </li>
        <li class="nav-item">
          {#if $loginToken}
            <a href="#" class="nav-link"
              on:click|preventDefault={logout}>Logout</a>
          {:else}
            <a href="#" class="nav-link">Login</a>
          {/if}
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="grid-cols-2">
  <SidebarNav {routes} />
  <main class="p-2">
  <slot />
  </main>
</div>

<dialog id="login-dialog" bind:this={loginDialog}>
  <div class="title">Login required</div>
  <LoginForm on:submit={submit} />
</dialog>
