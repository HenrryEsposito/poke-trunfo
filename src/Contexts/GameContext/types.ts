import { IPokemonData, IPokemonStatsData } from "../MainContext/types";

export interface IGameContextData {
  playerDeck: IPokemonData[];
  botDeck: IPokemonData[];
  buildDecks: () => void;
  Battle: (attackerStats: IPokemonStatsData, attackerIsPlayer: boolean) => void;
  playerBlocked: boolean;
}

export enum GameState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
}
