<script lang="ts">
  import Message from "./Message.svelte";

  export let messages;
  export let user;
</script>

<div>
  {#each messages as message}
    {#if user.id === message.user.id}
      <Message text={message.content} />
    {:else}
      <Message
        avatarImageUrl={message.user.avatar_url}
        text={message.content}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
</style>
