import React from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast/Toast";
import ToastContext from "../../../Contexts/ToastContext/ToastContext";
import { Container } from "./Styles";

function ToastContainer() {
  const {toasts} = React.useContext(ToastContext);

  return (
    <Container>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </Container>
  );
}

export default ToastContainer;