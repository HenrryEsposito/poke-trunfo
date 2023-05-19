export interface IMainContextData {
  fetchPokemonData: () => Promise<void>;
  pokemonDataList: IPokemonData[];
}

export interface IPokemonData {
  id: number;
  order: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default?: string;
  };
  stats: [
    {
      base_stat: 45;
      stat: {
        name: "hp";
      };
    }
  ];
}
