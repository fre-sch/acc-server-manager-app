<script>
  export let prefix;
  export let postfix;
  let isGroup = prefix !== undefined || postfix !== undefined
</script>

{#if (isGroup)}
<div class="input-group">
  {#if (prefix !== undefined)}
    <span class="input-group-text">{prefix}</span>
  {/if}
  <slot />
  {#if (postfix !== undefined)}
    <span class="input-group-text">{postfix}</span>
  {/if}
</div>
{:else}
  <slot />
{/if}
