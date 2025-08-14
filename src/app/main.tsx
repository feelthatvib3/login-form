import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'app/app';
import 'app/styles/index.css';

import { queryClient } from 'shared/api/query-client';

import('features/auth/lib/fetch-login-mock').then(({ setupLoginFetchMock }) => {
  setupLoginFetchMock();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
