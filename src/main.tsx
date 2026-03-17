import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Creances from './pages/Creances';
import Dashboard from './pages/Dashboard';
import Dettes from './pages/Dettes';
import Home from './pages/Home';
import Paiements from './pages/Paiements';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "accueil", element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dettes", element: <Dettes /> },
      { path: "creances", element: <Creances /> },
      { path: "paiements", element: <Paiements /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
