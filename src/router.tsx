import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Dettes from "./pages/Dettes";
import Creances from "./pages/Creances";
import Paiements from "./pages/Paiements";
import Parametre from "./pages/Parametre";
import Error404 from "./pages/Error404";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "accueil", element: <Home /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "dettes", element: <Dettes filterTitle="dette" filterCard={false} filterStatus={false} /> },
            { path: "créances", element: <Creances filterTitle="créance" filterCard={false} filterStatus={false} /> },
            { path: "paiements", element: <Paiements /> },
            { path: "parametre", element: <Parametre /> },
            { path: "*", element: <Error404 /> },
        ],
    },
]);
