import React, { useContext, useState } from "react";
import GameContext from "./GameContext";
import { GameState, IGameContextData } from "./types";
import { IPokemonData } from "../MainContext/types";
import MainContext from "../MainContext/MainContext";
import { createDecks } from "./GameMechanics/Deck";

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FC<IMainProviderProps> = ({ children }) => {
  const [currentGameState, setCurrentGameState] = useState<GameState>(GameState.IDLE);
  const [playerDeck, setPlayerDeck] = useState<IPokemonData[]>([]);
  const [botDeck, setBotDeck] = useState<IPokemonData[]>([]);

  const { pokemonDataList } = useContext(MainContext);

  function buildDecks() {
    const [playerDeck, botDeck] = createDecks(pokemonDataList);
    setPlayerDeck(playerDeck);
    setBotDeck(botDeck);
  }

  const providedData: IGameContextData = {
    currentGameState,
    playerDeck,
    botDeck,
    buildDecks,
  };

  return (
    <GameContext.Provider value={providedData}>{children}</GameContext.Provider>
  );
};

export default MainProvider;
