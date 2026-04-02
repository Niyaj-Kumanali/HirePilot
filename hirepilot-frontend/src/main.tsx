import { createRoot } from 'react-dom/client'
import './index.scss'
import React from 'react'
import { router } from './router/index.tsx'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index.ts';



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
