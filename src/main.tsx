import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home.page.tsx";
import "./index.css";
import RootLayout from "./layouts/root.layout.tsx";
import GamesPage from "./pages/games.page.tsx";
import GamePage from "./pages/game.page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="games">
            <Route index element={<GamesPage />} />
            <Route path=":id" element={<GamePage />} />
          </Route>

          <Route path="anniversary">
            <Route
              index
              element={
                <div className="text-primary flex h-screen w-screen items-center justify-center text-5xl font-bold">
                  Soon...
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
