import axios from "axios";
import { IPokemonData, IPokemonStatsData, PokemonStats } from "../Contexts/MainContext/types";
import { checkProperty, checkType } from "../Utils/TypeUtils";

export const pokeApiBaseURL = "https://pokeapi.co/api/v2";

const pokeApi = axios.create({
    baseURL: pokeApiBaseURL,
});

export const pokemonData = {
    ...pokeApi,
    get: async (id: number): Promise<unknown> => {
        if (!id) {
            throw new Error("An id is required to fetch pokemon data");
        }
        try {
            const response = await pokeApi.get<unknown>(`pokemon/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

function isValidPokemonStat(stat: string): stat is PokemonStats {
    return Object.values(PokemonStats).includes(stat as PokemonStats);
}

function mapStats(stats: unknown): IPokemonStatsData[] {
    const statArray = checkType<unknown[]>(stats, "object");
    return statArray.map((stat: unknown) => {
        const statObj = checkType<{ [key: string]: unknown }>(stat, "object");
        const innerStat = checkProperty<{ [key: string]: unknown }>(statObj, "stat", "object");
        const name = checkProperty<string>(innerStat, "name", "string");
        if (!isValidPokemonStat(name)) {
            throw new Error(`Invalid Pokemon stat "${name}"`);
        }
        const value = checkProperty<number>(statObj, "base_stat", "number");
        return {
            name: name as PokemonStats,
            value,
        };
    });
}

function mapPokemonData(rawData: unknown): IPokemonData {
    const data = checkType<{ [key: string]: unknown }>(rawData, "object");
    const id = checkProperty<number>(data, "id", "number");
    const order = checkProperty<number>(data, "order", "number");
    const name = checkProperty<string>(data, "name", "string");
    const sprites = checkProperty<{ [key: string]: unknown }>(data, "sprites", "object");
    const other = checkProperty<{ [key: string]: unknown }>(sprites, "other", "object");
    const artwork = checkProperty<{ [key: string]: unknown }>(other, "official-artwork", "object");
    const front_default = checkProperty<string>(artwork, "front_default", "string");
    const stats = mapStats(data.stats);
    const height = checkProperty<number>(data, "height", "number");
    const weight = checkProperty<number>(data, "weight", "number");
    return {
        id,
        order,
        name,
        sprites: {
            front_default: front_default || "",
        },
        stats: [
            ...stats,
            { name: PokemonStats.HEIGHT, value: height },
            { name: PokemonStats.WEIGHT, value: weight },
        ],
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
