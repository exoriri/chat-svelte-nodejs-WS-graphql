<script>
    import { Route, useNavigate } from "svelte-navigator";
    import { user } from '../../stores';

    export let path='';
    const navigate = useNavigate();

    $: {
        if ($user === null) {
            navigate('/login');
        }
    }
</script>

<Route {path}>
    <slot />
</Route>
