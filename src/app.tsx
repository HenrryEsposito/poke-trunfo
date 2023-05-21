import React from "react";
import { createRoot } from "react-dom/client";
import DevScreen from "./DevScreen";
import MainProvider from "./Contexts/MainContext/MainProvider";
import GameProvider from "./Contexts/GameContext/GameProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <MainProvider>
    <GameProvider>
      <DevScreen />
    </GameProvider>
  </MainProvider>
);
