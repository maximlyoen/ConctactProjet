import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, Login, Entreprises, Personnes, SinglePersonne, SingleEntreprise , CreateContact, CreateEntreprise, EditPersonne} from './pages'
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
    path: "/entreprise/:id",
    element: <SingleEntreprise />,
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
    path: "/personne/:id/edit",
    element: <EditPersonne />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createcontact",
    element: <CreateContact />,
  },
  {
    path: "/createentreprise",
    element: <CreateEntreprise />,
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