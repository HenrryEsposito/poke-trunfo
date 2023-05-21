import React, { useContext, useState } from "react";
import GameContext from "./GameContext";
import { GameState, IGameContextData } from "./types";
import { IPokemonData, IPokemonStatsData } from "../MainContext/types";
import MainContext from "../MainContext/MainContext";
import { createDecks, updateDecksAfterBattle } from "./GameMechanics/Deck";
import { CompareStats, GetStatsByName } from "./GameMechanics/Stats";

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FC<IMainProviderProps> = ({ children }) => {
  const [currentGameState, setCurrentGameState] = useState<GameState>(
    GameState.IDLE
  );
  const [playerDeck, setPlayerDeck] = useState<IPokemonData[]>([]);
  const [botDeck, setBotDeck] = useState<IPokemonData[]>([]);

  const { pokemonDataList } = useContext(MainContext);

  function buildDecks() {
    const [playerDeck, botDeck] = createDecks(pokemonDataList);
    setPlayerDeck(playerDeck);
    setBotDeck(botDeck);
  }

  function Battle(attackerStats: IPokemonStatsData, attackerIsPlayer: boolean) {
    const defenderStats = GetStatsByName(
      attackerIsPlayer ? botDeck[0].stats : playerDeck[0].stats, 
      attackerStats.name
    );
  
    const compareResult = CompareStats(attackerStats, defenderStats as IPokemonStatsData);
    
    let isPlayerWinner;
    
    switch (compareResult) {
      case 1:
        //attacker wins
        console.log("attacker wins");
        isPlayerWinner = attackerIsPlayer;
        break;
      case 0:
        //draw
        console.log("draw");
        break;
      case -1:
        //defender wins
        console.log("defender wins");
        isPlayerWinner = !attackerIsPlayer;
        break;
      default:
        break;
    }
  
    if (isPlayerWinner !== undefined) {
      const {winnerDeck, loserDeck} = isPlayerWinner 
        ? updateDecksAfterBattle(playerDeck, botDeck)
        : updateDecksAfterBattle(botDeck, playerDeck);
        
      setPlayerDeck(isPlayerWinner ? [...winnerDeck] : [...loserDeck]);
      setBotDeck(isPlayerWinner ? [...loserDeck] : [...winnerDeck]);
    }
  }

  const providedData: IGameContextData = {
    currentGameState,
    playerDeck,
    botDeck,
    buildDecks,
    Battle
  };

  return (
    <GameContext.Provider value={providedData}>{children}</GameContext.Provider>
  );
};

export default MainProvider;
