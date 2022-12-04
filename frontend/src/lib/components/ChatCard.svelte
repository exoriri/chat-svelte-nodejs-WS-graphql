<script lang="ts">
    import Avatar from "./Avatar.svelte";

    export let avatarUrl;
    export let titleName;
    export let messageText;
    export let active;
</script>

<div class={`chat-card ${active ? 'chat-card--active' : ''}`}>
    <Avatar width={'55px'} height={'55px'} imageUrl={avatarUrl} />
    <div class="chat-card__text">
        <h3 class="chat-card__title">{titleName}</h3>
        <p class="chat-card__content">{messageText}</p>
    </div>
</div>

<style lang="scss">
    .chat-card {
        display: flex;
        align-items: center;
        border-radius: 15px;
        padding: 17px 15px;
        color: #000;
        background: #fff;
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: .25);
        max-height: 100px;

        &__text {
            margin-left: 13px;
            word-break: break-all;
        }

        &__title {
            font-family: 'Roboto-Medium';
            font-size: 1.25rem;
            margin-bottom: 5px;
        }

        &__content {
            display: -webkit-box;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        &--active {
            background-color: var(--primary-color);
            color: #fff;
        }
    }
</style>