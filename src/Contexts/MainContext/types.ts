export interface IMainContextData {
  fetchPokemonData: () => Promise<void>;
  pokemonDataList: IPokemonData[];
}

export enum PokemonStats {
  HEIGHT = "height",
  WEIGHT = "weight",
  HP = "hp",
  ATTACK = "attack",
  DEFENSE = "defense",
  SPECIALATTACK = "special-attack",
  SPECIALDEFENSE = "special-defense",
  SPEED = "speed",
}

export interface IPokemonStatsData {
  name: PokemonStats;
  value: number;
}

export interface IPokemonData {
  id: number;
  order: number;
  name: string;
  sprites: {
    front_default?: string;
  };
  stats: IPokemonStatsData[];
}
