import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./page/dashboard/dashboard";
import Equipe from "./page/equipe/equipe";
import Reclamations from "./page/reclamations/reclamations";
import Barres from "./page/barres/barres";
import Secteurs from "./page/secteurs/secteurs";
import Lineaires from "./page/linearies/linearies";
import Geographiques from "./page/geographique/geographique";

// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="reclamations" element={<Reclamations />} />
      <Route path="equipe" element={<Equipe />} />

      <Route path="Graphique à barres" element={<Barres />} />
      <Route path="Graphique en secteurs" element={<Secteurs />} />
      <Route path="Graphique linéaire" element={<Lineaires />} />
      <Route path="Graphique géographique" element={<Geographiques />} />
    </Route>
  )
);

// Sélectionne l'élément root
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
