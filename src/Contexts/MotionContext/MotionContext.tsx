import React from "react";
import { IMotionContextData } from "./types";

const MotionContext = React.createContext<IMotionContextData>(
    {} as IMotionContextData
);

export default MotionContext;