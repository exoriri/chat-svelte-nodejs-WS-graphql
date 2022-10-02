<script>
  import { Router, Route } from 'svelte-navigator';

  import ChatPage from './pages/chat.svelte';
  import LoginPage from './pages/login.svelte';

  import ProtectedRoute from './lib/components/ProtectedRoute.svelte';
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

