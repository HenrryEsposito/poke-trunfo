import React from "react";
import { IGameContextData } from "./types";

const GameContext = React.createContext<IGameContextData>(
    {} as IGameContextData
);

export default GameContext;