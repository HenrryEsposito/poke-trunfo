import React, { ReactElement } from "react";
import { DeckContainer } from "./Styles";

type IBasicDeckProps = {
  children: ReactElement[] | ReactElement;
};

function BasicDeck({ children }: IBasicDeckProps) {
  const totalCards = React.Children.count(children);
  const rotationFactor = 1.5;
  const arcFactor = 5;
  const childrenArray = React.Children.toArray(children).reverse();

  return (
    <DeckContainer>
      {childrenArray.map((child, index) => {
        const relativeIndex = index - totalCards / 2;
        return React.cloneElement(child as ReactElement, {
          style: {
            ...(child as ReactElement).props.style,
            transform: `rotate(${relativeIndex * rotationFactor}deg) 
                        translateY(${Math.abs(relativeIndex) * (arcFactor / 3)}px)
                        translateX(${relativeIndex * (arcFactor * 3)}px)`,
          },
        });
      })}
    </DeckContainer>
  );
}

export default BasicDeck;
