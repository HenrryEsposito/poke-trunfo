import React from "react";
import MotionContext from "./MotionContext";
import { IMotionContextData } from "./types";
import { useAnimation } from "framer-motion";

interface IMotionProviderProps {
  children: React.ReactNode;
}

const MotionProvider: React.FC<IMotionProviderProps> = ({ children }) => {
  const controls = useAnimation();

  const startAnimation = () => {
    // await controls.start({ x: 100, transition: { duration: 2 } });
    // await controls.start({ x: 0, transition: { duration: 2 } });

    controls.start({
      x: [0, -5, 5, -5, 5, 0],
      y: [0, 5, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    });
  };

  const providedData: IMotionContextData = {
    controls,
    startAnimation,
  };

  return (
    <MotionContext.Provider value={providedData}>
      {children}
    </MotionContext.Provider>
  );
};

export default MotionProvider;
