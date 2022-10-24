<script>
  import { Router, Route } from 'svelte-navigator';
  import { setClient } from 'svelte-apollo';
  import client from './client';

  import ChatPage from './pages/chat.svelte';
  import LoginPage from './pages/login.svelte';

  import ProtectedRoute from './lib/components/ProtectedRoute.svelte';

  setClient(client);
</script>

<Router>
  <ProtectedRoute path='/chat'>
    <ChatPage />
  </ProtectedRoute>
  <Route path='/login'>
    <LoginPage />
  </Route>
</Router>

<style>

</style>

