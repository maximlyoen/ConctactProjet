import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, Login, Entreprises, Personnes } from './pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { AuthProvider } from './hooks/useAuth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/entreprises",
    element: <Entreprises />,
  },
  {
    path: "/personnes",
    element: <Personnes />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
