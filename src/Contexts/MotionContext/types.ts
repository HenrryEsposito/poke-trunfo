import { AnimationControls } from "framer-motion";

export interface IMotionContextData {
  controls: AnimationControls;
  startAnimation: () => void;
}
