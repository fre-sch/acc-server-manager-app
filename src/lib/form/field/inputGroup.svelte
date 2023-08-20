<script>
  import isNil from "lodash/isNil"

  export let prefix
  export let postfix
  let isGroup = prefix !== undefined || postfix !== undefined
</script>

{#if (isGroup)}
<div class="input-group">
  {#if (!isNil(prefix))}
    <span class="input-group-text">{prefix}</span>
  {/if}
  <slot />
  {#if (!isNil(postfix))}
    <span class="input-group-text">{postfix}</span>
  {/if}
</div>
{:else}
  <slot />
{/if}
