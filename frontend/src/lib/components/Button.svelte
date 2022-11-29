<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher ();

    function handleClick() {
        dispatch('click');
    }

</script>

<style>
    .button {
        background: none;
        border: none;
        cursor: pointer;
        display: block;
        text-align: left;
    }
</style>

<button on:click={handleClick} class={`button ${$$props.class}`}>
    <slot />
</button>