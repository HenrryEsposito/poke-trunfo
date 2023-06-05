import React from "react";
import { IToastContextData } from "./types";

const ToastContext = React.createContext<IToastContextData>(
    {} as IToastContextData
);

export default ToastContext;