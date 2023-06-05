import styled from "styled-components";

export const DeckContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  perspective: 1500px;

  & > div {
    position: absolute;
    transform-origin: center bottom;
  }
`;