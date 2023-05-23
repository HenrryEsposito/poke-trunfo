import React, { useState } from "react";
import ToastContext from "./ToastContext";
import { IToastContextData, IToastData } from "./types";

interface IToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
  const [ toasts, setToasts ] = useState<IToastData[]>([]);

  function addToast(toastMessage: string, lifeTime?: number) {
    const newToast: IToastData = {
      id: Date.now().toString(),
      message: toastMessage,
      lifeTime: lifeTime || 2000
    };
    
    setToasts([...toasts, newToast]);
  }

  function removeToast(id: string) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  const providedData: IToastContextData = {
    toasts,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={providedData}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
