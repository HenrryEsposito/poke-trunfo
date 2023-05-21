import { IPokemonData } from "../MainContext/types";

export interface IGameContextData {
  currentGameState: GameState;
  playerDeck: IPokemonData[];
  botDeck: IPokemonData[];
  buildDecks: () => void;
}

export enum GameState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
}
