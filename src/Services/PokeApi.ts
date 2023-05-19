import axios from "axios";
import { IPokemonData } from "../Contexts/MainContext/types";

export const pokeApiBaseURL: string = "https://pokeapi.co/api/v2";

const pokeApi = axios.create({
  baseURL: pokeApiBaseURL,
});

export const pokemonData = {
  ...pokeApi,
  get: async (id: number): Promise<IPokemonData> => {
    if (!id) {
      throw new Error("An id is required to fetch pokemon data");
    }
    try {
      const response = await pokeApi.get<IPokemonData>(`pokemon/${id}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

function mapPokemonData(rawData: any): IPokemonData {
  return {
    id: rawData.id,
    order: rawData.order,
    name: rawData.name,
    height: rawData.height,
    weight: rawData.weight,
    sprites: {
      front_default: rawData.sprites.front_default || '',
    },
    stats: rawData.stats.map((stat: any) => ({
      base_stat: stat.base_stat,
      stat: {
        name: stat.stat.name,
      },
    })),
  };
}

export async function getPokemons(ids: number[]): Promise<IPokemonData[]> {
    const pokemons: IPokemonData[] = [];
  
    for (const id of ids) {
      try {
        const response = await pokemonData.get(id);
        const pokemon = mapPokemonData(response);
        pokemons.push(pokemon);
  
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
    return pokemons;
  }

export default pokeApi;
