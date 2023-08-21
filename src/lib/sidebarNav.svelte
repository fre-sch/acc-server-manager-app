<script>
  import Icon from "$lib/icon.svelte"
  export let routes;
</script>

<nav class="bg-body-tertiary p-2">
  <ul class="nav nav-pills flex-column">
    {#each routes as route}
    <li class="nav-item">
      <a class="nav-link"
        class:active={route.active}
        href={route.href}>
        {#if route.icon}
          <Icon cls={route.icon} />
        {/if}
        {route.title}
      </a>
        {#if route.active && route?.children?.length > 0}
          <svelte:self routes={route.children} />
        {/if}
    </li>
    {/each}
  </ul>
</nav>
