import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import RootLayout from "./layouts/root.layout.tsx";
import {
  AnniversaryPage,
  CongratulationsPage,
  GamePage,
  GamesPage,
  HomePage,
} from "./pages/index.ts";
import { LINKS } from "./constants/links.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path={LINKS.home} element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path={LINKS.games}>
            <Route index element={<GamesPage />} />
            <Route path=":id" element={<GamePage />} />
          </Route>

          <Route path={LINKS.anniversary} element={<AnniversaryPage />} />
          <Route path={LINKS.congratulations} element={<CongratulationsPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
