import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // <-- أضفنا
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient(); // <-- أنشأنا QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* <-- غلفنا App بالـ Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);