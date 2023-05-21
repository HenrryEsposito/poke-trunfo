import { IPokemonData, IPokemonStatsData } from "../MainContext/types";

export interface IGameContextData {
  currentGameState: GameState;
  playerDeck: IPokemonData[];
  botDeck: IPokemonData[];
  buildDecks: () => void;
  Battle: (attackerStats: IPokemonStatsData, attackerIsPlayer: boolean) => void;
}

export enum GameState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
}
