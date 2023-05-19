import React from "react";
import { createRoot } from "react-dom/client";
import GenericComponent from "./GenericComponent";
import MainProvider from "./Contexts/MainContext/MainProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
    <MainProvider
        children={<GenericComponent />}
    />
)
