import React, { useContext } from "react";
import { IPokemonData } from "../../../Contexts/MainContext/types";
import {
  CardBody,
  CardThumbContainer,
  CardThumb,
  DataContainer,
  DataTitle,
  PokemonNumber,
  StatsContainer,
  StatsName,
  StatsValue,
} from "./Styles";
import { capitalizeFirstLetter } from "../../../Utils/StringUtils";
import GameContext from "../../../Contexts/GameContext/GameContext";
import { motion } from "framer-motion";
import MotionContext from "../../../Contexts/MotionContext/MotionContext";

export interface IBasicPokemonCardProps {
  data: IPokemonData;
  style?: React.CSSProperties;
}

function BasicPokemonCard({ data, style }: IBasicPokemonCardProps) {
  const { Battle, playerBlocked } = useContext(GameContext);
  const { controls } = useContext(MotionContext);

  return (
    <CardBody style={style}>
      <PokemonNumber>#{data.order.toString().padStart(3, "0")}</PokemonNumber>
      <DataTitle>{capitalizeFirstLetter(data.name)}</DataTitle>

      <CardThumbContainer>
        <CardThumb src={data.sprites.front_default} alt={data.name} />
      </CardThumbContainer>

      <motion.div animate={controls}>
        <DataTitle>Stats:</DataTitle>
      </motion.div>

      <DataContainer>
        {data.stats.map((stat, index) => (
          <StatsContainer
            key={index}
            onClick={() => (!playerBlocked ? Battle(stat, true) : null)}
            playerblocked={playerBlocked}
          >
            <StatsName>{capitalizeFirstLetter(stat.name)}</StatsName>
            <StatsValue>{stat.value}</StatsValue>
          </StatsContainer>
        ))}
      </DataContainer>
    </CardBody>
  );
}

export default BasicPokemonCard;
