import React from "react";
import { IPokemonData } from "../../Contexts/MainContext/types";
import {
  CardBody,
  CardThumbContainer,
  CardThumb,
  DataContainer,
  DataTitle,
  PokemonNumber,
} from "./Styles";
import { capitalizeFirstLetter } from "../../Utils/StringUtils";

export interface IBasicPokemonCardProps {
  data: IPokemonData;
}

function BasicPokemonCard({ data }: IBasicPokemonCardProps) {
  return (
    <CardBody>
      <PokemonNumber>#{data.order.toString().padStart(3, "0")}</PokemonNumber>
      <DataTitle>{capitalizeFirstLetter(data.name)}</DataTitle>

      <CardThumbContainer>
        <CardThumb src={data.sprites.front_default} alt={data.name} />
      </CardThumbContainer>

      <DataTitle>Stats:</DataTitle>
      <DataContainer>
        <ul>
          {data.stats.map((stat, index) => (
            <li key={index}>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>
      </DataContainer>
    </CardBody>
  );
}

export default BasicPokemonCard;
