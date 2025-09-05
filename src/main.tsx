import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Router from './routes/index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
