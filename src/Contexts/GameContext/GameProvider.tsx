import React, { useContext, useState } from "react";
import GameContext from "./GameContext";
import { IGameContextData } from "./types";
import { IPokemonData, IPokemonStatsData } from "../MainContext/types";
import MainContext from "../MainContext/MainContext";
import { createDecks, updateDecksAfterBattle } from "./GameMechanics/Deck";
import { CompareStats, GetStatsByName } from "./GameMechanics/Stats";
import { BotDecision } from "./GameMechanics/Bot";
import ToastContext from "../ToastContext/ToastContext";

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FC<IMainProviderProps> = ({ children }) => {
  const [playerDeck, setPlayerDeck] = useState<IPokemonData[]>([]);
  const [botDeck, setBotDeck] = useState<IPokemonData[]>([]);
  const [playerBlocked, setPlayerBlocked] = useState<boolean>(false);

  const { pokemonDataList } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);

  function buildDecks() {
    const [playerDeck, botDeck] = createDecks(pokemonDataList);
    setPlayerDeck(playerDeck);
    setBotDeck(botDeck);
  }

  function resetDecks() {
    setPlayerDeck([]);
    setBotDeck([]);
  }

  function Battle(attackerStats: IPokemonStatsData, attackerIsPlayer: boolean) {
    if(playerBlocked && attackerIsPlayer) {
      return;
    }

    const defenderStats = GetStatsByName(
      attackerIsPlayer ? botDeck[0].stats : playerDeck[0].stats, 
      attackerStats.name
    );
  
    const compareResult = CompareStats(attackerStats, defenderStats as IPokemonStatsData);
    
    let isPlayerWinner;
    let draw = false;
    
    switch (compareResult) {
    case 1:
      //attacker wins
      isPlayerWinner = attackerIsPlayer;
      break;
    case 0:
      //draw
      draw = true;
      break;
    case -1:
      //defender wins
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

      if(botDeck.length === 0) {
        addToast("Você ganhou o JOGO!");
        resetDecks();
      } else if(playerDeck.length === 0) {
        addToast("Seu oponente te derrotou!");
        resetDecks();
      }
    }

    if(isPlayerWinner === false || (draw === true && attackerIsPlayer === false)) {
      BotLoop();
      setPlayerBlocked(true);
    } else {
      setPlayerBlocked(false);
    }

    if(isPlayerWinner === true ) {
      if(attackerIsPlayer === true) {
        addToast("Você ganhou a batalha!");
      } else{
        addToast("Seu oponente perdeu a batalha. Sua vez!");
      }

    }
    else if(isPlayerWinner === false) {
      if(attackerIsPlayer === true) {
        addToast("Você perdeu a batalha. Vez do oponente.");
      } else {
        addToast("Seu oponente ganhou a batalha.");
      }
    } else if(draw === true) {
      addToast("Empate.");
    }
  }

  async function BotLoop() {
    const botDecision = await BotDecision(botDeck);

    Battle(botDecision, false);
  }

  const providedData: IGameContextData = {
    playerDeck,
    botDeck,
    buildDecks,
    Battle,
    playerBlocked
  };

  return (
    <GameContext.Provider value={providedData}>{children}</GameContext.Provider>
  );
};

export default MainProvider;
