import styled from "styled-components";
import { motion } from "framer-motion";

export const ToastCard = styled(motion.div)`
  background-color: lightgray;
  color: black;
  padding: 30px;
  margin: 30px;
  border-radius: 10px;
  min-height: 100px;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
`;
