import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, Login, Entreprises, Personnes, SinglePersonne, Utilisateurs } from './pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { AuthProvider } from './hooks/useAuth';
import { SingleUtilisateur } from './pages/SingleUtilisateur';

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
    path: "/personne/:id",
    element: <SinglePersonne />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/utilisateurs",
    element: <Utilisateurs />,
  },
  {
    path: "/utilisateurs/:id",
    element: <SingleUtilisateur />,
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
