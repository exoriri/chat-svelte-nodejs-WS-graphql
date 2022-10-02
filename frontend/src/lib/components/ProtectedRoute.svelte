<script>
    import { Route, useNavigate } from "svelte-navigator";

    export let path='';
    const navigate = useNavigate();
    $: authToken = localStorage.getItem('authToken');

    $: {
        if (authToken === null) {
            navigate('/login');
        }
    }
</script>

<Route {path}>
    <slot />
</Route>
