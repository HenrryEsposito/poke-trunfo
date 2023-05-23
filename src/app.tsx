import React from "react";
import { createRoot } from "react-dom/client";
import DevScreen from "./DevScreen";
import MainProvider from "./Contexts/MainContext/MainProvider";
import GameProvider from "./Contexts/GameContext/GameProvider";
import ToastProvider from "./Contexts/ToastContext/ToastProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <ToastProvider>
    <MainProvider>
      <GameProvider>
        <DevScreen />
      </GameProvider>
    </MainProvider>
  </ToastProvider>
);
