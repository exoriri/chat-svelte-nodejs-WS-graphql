<script>
    import Avatar from "./Avatar.svelte";

    export let avatarImageUrl = '';

    export let text = '';

    const messageClasses = avatarImageUrl ? "message" : "message message--personal";
</script>

<style lang="scss">
    .message {
        display: flex;
        align-items: center;
        margin-top: 25px;

        &:first-child {
            margin-top: 0;
        }
        
        &--personal {
            justify-content: flex-end;
            margin-top: 20px;
        }

        &--personal &__text {
            color: #fff;
            margin-left: 0;
            background: var(--primary-color);
        }

        &__text {
            font-family: 'Roboto-Regular';
            color: #000;
            font-size: 1.375rem;
            padding: 20px;
            border-radius: 25px;
            margin-left: 20px;
            border-bottom-left-radius: 0;
            background: var(--secondary-color);
        }
    }
</style>

<div class={messageClasses}>
    {#if avatarImageUrl}
        <Avatar imageUrl={avatarImageUrl} />
    {/if}

    <p class="message__text">
        {text}
    </p>
</div>