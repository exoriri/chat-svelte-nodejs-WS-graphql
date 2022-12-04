<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy  } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import Avatar from "./Avatar.svelte";

    export let userName = '';
    export let avatarImageUrl = '';

    $: menuShownClass = '';

    const dispatch = createEventDispatcher ();

    onMount(() => {
        window.addEventListener('click', hideProfileMenu);
    });

    onDestroy(() => {
        window.removeEventListener('click', hideProfileMenu);
    }) 

    function handleLogout() {
        dispatch('logout');
        navigate('/login');
    }

    function showProfileMenu() {
        menuShownClass = 'menu--shown';
    }

    function hideProfileMenu() {
        menuShownClass = '';
    }
</script>

<div class="user-header">
    <h3 class="user-header__username">{userName}</h3>
    <button on:click|stopPropagation={showProfileMenu} class="profile">
        <Avatar imageUrl={avatarImageUrl} />
        <div class={`menu ${menuShownClass}`}>
            <button on:click|stopPropagation={handleLogout} class="menu__btn">
                Выход
            </button>
        </div>
    </button>
</div>

<style lang="scss">
    .user-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;

        &__username {
            font-size: 1.625rem;
            font-family: 'Roboto-Regulart';
            margin-right: 16px;
        }
    }

    .profile {
        position: relative;
        cursor: pointer;
        background: none;
        border: none;
    }

    .menu {
        display: none;
        position: absolute;
        bottom: -50px;
        right: 0;
        box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, .4);
        background: #fff;

        &--shown {
            display: flex;
        }

        &__btn {
            color: #000;
            font-family: 'Roboto-Regular';
            font-size: 1.25rem;
            cursor: pointer;
            background: none;
            border: none;
            padding: 15px 20px;
        }
    }
</style>