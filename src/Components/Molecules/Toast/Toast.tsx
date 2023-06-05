import React, { useEffect } from "react";
import ToastContext from "../../../Contexts/ToastContext/ToastContext";
import { ToastCard } from "./Styles";

const toastVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

interface IToastProps {
    message: string;
    id: string;
    lifeTime: number;
}

function Toast({ message, id, lifeTime }: IToastProps) {
  const { removeToast } = React.useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, lifeTime);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <ToastCard
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={toastVariants}
      transition={{ ease: "easeOut", duration: 0.5 }}
      style={{
        background: "lightgray",
        color: "black",
        padding: "1em",
        margin: "1em",
        borderRadius: "0.5em",
      }}
    >
      {message}
    </ToastCard>
  );
}

export default Toast;
