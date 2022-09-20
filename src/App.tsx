import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router/Router';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
